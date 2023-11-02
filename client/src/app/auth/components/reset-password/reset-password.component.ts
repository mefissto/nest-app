import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthStoreFacadeService } from '@core/services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  public form: UntypedFormGroup;

  public loading$: Observable<boolean> = this.authStoreFacade.isLoading$;

  constructor(private readonly fb: UntypedFormBuilder, private readonly authStoreFacade: AuthStoreFacadeService) {}

  get email(): UntypedFormControl {
    return this.form.get('email') as UntypedFormControl;
  }

  get password(): UntypedFormControl {
    return this.form.get('password') as UntypedFormControl;
  }

  get username(): UntypedFormControl {
    return this.form.get('username') as UntypedFormControl;
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
