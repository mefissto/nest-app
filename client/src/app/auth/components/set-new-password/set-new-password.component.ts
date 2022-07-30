import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthStoreFacadeService } from '@core/services';
import { confirmPasswords } from '@core/validators/confirm-password.validator';
import { AuthUser } from '@core/models/auth/auth.model';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
})
export class SetNewPasswordComponent implements OnInit {
  public form: FormGroup;

  public loading$: Observable<boolean> = this.authStoreFacade.loading$;

  private userId: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authStoreFacade: AuthStoreFacadeService
  ) {}

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  public ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((data) => {
      this.userId = data?.id;

      if (!this.userId) {
        this.router.navigate(['auth/login']);
      }
    });

    this.form = this.fb.group(
      {
        password: [null, [Validators.required, Validators.minLength(4)]],
        confirmPassword: [null, [Validators.required, Validators.minLength(4)]],
      },
      { validators: confirmPasswords }
    );
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.authStoreFacade.dispatchSetNewPassword(
        new AuthUser({ password: this.form.value.password, _id: this.userId })
      );
    }
  }
}
