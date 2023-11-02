import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AuthUser } from '@core/models/auth/auth.model';
import { AuthResponse } from '@core/models/auth/token.model';

const authActions = createActionGroup({
  source: 'AUTH',
  events: {
    // LOGIN
    'Login Request': props<{ userDto: AuthUser }>(),
    'Login Success': props<{ data: AuthResponse }>(),
    'Login Failure': emptyProps(),

    // REGISTRATION
    'Registration Request': props<{ userDto: AuthUser; cb: (err) => void }>(),
    'Registration Success': emptyProps(),
    'Registration Failure': emptyProps(),

    // RESET PASSWORD
    'Reset Password Request': props<{ email: string }>(),
    'Reset Password Success': emptyProps(),
    'Reset Password Failure': emptyProps(),

    // SET NEW PASSWORD
    'Set New Password Request': props<{ userDto: AuthUser }>(),
    'Set New Password Success': emptyProps(),
    'Set New Password Failure': emptyProps(),
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  setNewPasswordRequest,
  setNewPasswordSuccess,
  setNewPasswordFailure,
} = authActions;
