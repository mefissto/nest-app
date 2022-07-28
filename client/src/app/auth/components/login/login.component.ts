import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthUser } from '@core/models/auth/auth.model';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private subs: Subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
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
      const user = new AuthUser(this.form.value);
      this.subs.add(this.authService.login(user).subscribe(() => this.router.navigate(['/'])));
    }
  }
}
