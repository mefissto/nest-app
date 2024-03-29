import { createSelector } from '@ngrx/store';

import { AppState } from '@store/auth/interfaces/app-state.interface';
import { AuthState } from '@store/auth/interfaces/auth-state.interface';

export const selectAuthState = (state: AppState): AuthState => state.auth;

export const selectLoading = createSelector(selectAuthState, (state: AuthState) => state.loading);
export const selectIsAuthenticated = createSelector(selectAuthState, (state: AuthState) => state.isAuthenticated);
export const selectCurrentUser = createSelector(selectAuthState, (state: AuthState) => state.user);
export const selectToken = createSelector(selectAuthState, (state: AuthState) => state.token);
