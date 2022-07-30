import { createAction, props } from '@ngrx/store';

import { AuthUser } from '@core/models/auth/auth.model';
import { AuthResponse } from '@core/models/auth/token.model';

export const loginRequest = createAction('[AUTH] Login Request Action', props<{ userDto: AuthUser }>());
export const loginSuccess = createAction('[AUTH] Login Success Action', props<{ data: AuthResponse }>());
export const loginFailure = createAction('[AUTH] Login Failure Action');

export const registrationRequest = createAction(
  '[AUTH] Registration Request Action',
  props<{ userDto: AuthUser; cb: (err) => void }>()
);
export const registrationSuccess = createAction('[AUTH] Registration Success Action');
export const registrationFailure = createAction('[AUTH] Registration Failure Action');

export const resetPasswordRequest = createAction('[AUTH] Reset Password Request Action', props<{ email: string }>());
export const resetPasswordSuccess = createAction('[AUTH] Reset Password Success Action');
export const resetPasswordFailure = createAction('[AUTH] Reset Password Failure Action');

export const setNewPasswordRequest = createAction(
  '[AUTH] Set New Password Request Action',
  props<{ userDto: AuthUser }>()
);
export const setNewPasswordSuccess = createAction('[AUTH] Set New Password Success Action');
export const setNewPasswordFailure = createAction('[AUTH] Set New Password Failure Action');
