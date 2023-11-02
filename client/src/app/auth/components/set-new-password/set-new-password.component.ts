import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';
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
  public form: UntypedFormGroup;

  public loading$: Observable<boolean> = this.authStoreFacade.loading$;

  private userId: string;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authStoreFacade: AuthStoreFacadeService
  ) {}

  get password(): UntypedFormControl {
    return this.form.get('password') as UntypedFormControl;
  }

  get confirmPassword(): UntypedFormControl {
    return this.form.get('confirmPassword') as UntypedFormControl;
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
