import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '@store/interfaces/app-state.interface';
import { AuthUser } from '@core/models/auth/auth.model';
import * as authActions from '@store/actions/auth.actions';
import * as authSelectors from '@store/selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthStoreFacadeService {
  public loading$: Observable<boolean> = this.store.select(authSelectors.selectLoading);

  constructor(private readonly store: Store<AppState>) {}

  public dispatchLogin(userDto: AuthUser): void {
    this.store.dispatch(authActions.loginRequest({ userDto }));
  }

  public dispatchRegistration(userDto: AuthUser, cb: (err) => void): void {
    this.store.dispatch(authActions.registrationRequest({ userDto, cb }));
  }

  public dispatchResetPassword(email: string): void {
    this.store.dispatch(authActions.resetPasswordRequest({ email }));
  }

  public dispatchSetNewPassword(userDto: AuthUser): void {
    this.store.dispatch(authActions.setNewPasswordRequest({ userDto }));
  }
}
