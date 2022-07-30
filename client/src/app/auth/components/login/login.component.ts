import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthUser } from '@core/models/auth/auth.model';
import { AuthStoreFacadeService } from '@core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  public loading$: Observable<boolean> = this.authStoreFacade.loading$;

  constructor(private readonly fb: FormBuilder, private readonly authStoreFacade: AuthStoreFacadeService) {}

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

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.authStoreFacade.dispatchLogin(new AuthUser(this.form.value));
    }
  }
}
