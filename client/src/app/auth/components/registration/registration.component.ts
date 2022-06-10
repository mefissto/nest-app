import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '@core/services';
import { AuthUser } from '@core/models/auth/auth.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  public form: UntypedFormGroup;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const userModel = new AuthUser(this.form.value);
      this.subs.add(
        this.authService.registration(userModel).subscribe(
          () => {
            this.form.reset();

            this.router.navigate(['auth/login']);
          },
          (err) => {
            if (err.status === 403) {
              this.email.setErrors({ exist: true });
            }
          }
        )
      );
    }
  }
}
