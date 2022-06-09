import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '@services/auth/auth.service';
import { AuthUser } from '@models/auth/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  public form: UntypedFormGroup;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const user = new AuthUser(this.form.value);
      this.subs.add(
        this.authService.login(user).subscribe((suc) => {
          this.router.navigate(['/']);
        })
      );
    }
  }
}
