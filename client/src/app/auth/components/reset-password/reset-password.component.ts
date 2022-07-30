import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthStoreFacadeService } from '@core/services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;

  public loading$: Observable<boolean> = this.authStoreFacade.loading$;

  constructor(private readonly fb: FormBuilder, private readonly authStoreFacade: AuthStoreFacadeService) {}

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

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.authStoreFacade.dispatchResetPassword(this.form.value.email);
    }
  }
}
