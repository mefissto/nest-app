import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthStoreFacadeService } from '@core/services';
import { AuthUser } from '@core/models/auth/auth.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  public form: UntypedFormGroup;

  public loading$: Observable<boolean> = this.authStoreFacade.loading$;

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
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const cb = (err): void => {
        if (err.status === 403) {
          this.email.setErrors({ exist: { message: err.error.message } });
        }
      };
      this.authStoreFacade.dispatchRegistration(new AuthUser(this.form.value), cb);
    }
  }
}
