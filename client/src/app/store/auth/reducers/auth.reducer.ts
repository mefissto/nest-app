import { createReducer, on } from '@ngrx/store';

import * as authActions from '@store/auth/actions/auth.actions';
import { AuthState } from '../interfaces/auth-state.interface';

export const authFeatureKey = 'auth';
export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  token: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(
    authActions.loginRequest,
    authActions.registrationRequest,
    authActions.resetPasswordRequest,
    authActions.setNewPasswordRequest,
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(authActions.loginSuccess, (state, { data: { access_token, user } }) => ({
    ...state,
    loading: false,
    token: access_token,
    user,
  })),
  on(
    authActions.loginFailure,
    authActions.registrationSuccess,
    authActions.registrationFailure,
    authActions.resetPasswordSuccess,
    authActions.resetPasswordFailure,
    authActions.setNewPasswordSuccess,
    authActions.setNewPasswordFailure,
    (state) => ({
      ...state,
      loading: false,
    })
  )
);
