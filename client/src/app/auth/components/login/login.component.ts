import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthUser } from '@core/models/auth/auth.model';
import { AuthStoreFacadeService } from '@core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public form: UntypedFormGroup;

  public loading$: Observable<boolean> = this.authStoreFacade.isLoading$;

  constructor(private readonly fb: UntypedFormBuilder, private readonly authStoreFacade: AuthStoreFacadeService) {}

  get email(): UntypedFormControl {
    return this.form.get('email') as UntypedFormControl;
  }

  get password(): UntypedFormControl {
    return this.form.get('password') as UntypedFormControl;
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.authStoreFacade.dispatchLogin(new AuthUser(this.form.value));
    }
  }
}
