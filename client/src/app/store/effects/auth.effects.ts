import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '@core/services';
import * as authActions from '../actions/auth.actions';
import { AuthResponse } from '@core/models/auth/token.model';

@Injectable()
export class AuthEffects {
  public loginAction = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.loginRequest),
      exhaustMap(({ userDto }) =>
        this.authService.login(userDto).pipe(
          map((data: AuthResponse) => {
            this.router.navigate(['/']);
            return authActions.loginSuccess({ data });
          }),
          catchError(() => of(authActions.loginFailure()))
        )
      )
    )
  );

  public registrationAction = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.registrationRequest),
      exhaustMap(({ userDto, cb }) =>
        this.authService.registration(userDto).pipe(
          map(() => {
            this.router.navigate(['auth/login']);
            return authActions.registrationSuccess();
          }),
          catchError((error) => {
            cb(error);
            return of(authActions.registrationFailure());
          })
        )
      )
    )
  );

  public resetPasswordAction = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.resetPasswordRequest),
      exhaustMap(({ email }) =>
        this.authService.resetPassword(email).pipe(
          map(({ id }) => {
            if (id) {
              this.router.navigate(['auth/set-new-password'], { queryParams: { id } });
            }
            return authActions.resetPasswordSuccess();
          }),
          catchError(() => of(authActions.resetPasswordFailure()))
        )
      )
    )
  );

  public setNewPasswordAction = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.setNewPasswordRequest),
      exhaustMap(({ userDto }) =>
        this.authService.setNewPassword(userDto).pipe(
          map(() => {
            this.router.navigate(['auth/login']);
            return authActions.setNewPasswordSuccess();
          }),
          catchError(() => of(authActions.setNewPasswordFailure()))
        )
      )
    )
  );

  constructor(private actions: Actions, private authService: AuthService, private router: Router) {}
}
