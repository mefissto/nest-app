import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '@core/services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
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

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.subs.add(
        this.authService.resetPassword(this.form.value.email).subscribe(() => {
          // !TODO --> add logic
        })
      );
    }
  }
}
