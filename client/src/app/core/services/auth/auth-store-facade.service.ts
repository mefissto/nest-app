import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '@store/auth/interfaces/app-state.interface';
import { AuthUser } from '@core/models/auth/auth.model';
import { actions, selectors } from '@store/auth';

@Injectable({ providedIn: 'root' })
export class AuthStoreFacadeService {
  public isLoading$: Observable<boolean> = this.store.select(
    selectors.selectLoading
  );

  constructor(private readonly store: Store<AppState>) {}

  public dispatchLogin(userDto: AuthUser): void {
    this.store.dispatch(actions.loginRequest({ userDto }));
  }

  public dispatchRegistration(userDto: AuthUser, cb: (err) => void): void {
    this.store.dispatch(actions.registrationRequest({ userDto, cb }));
  }

  public dispatchResetPassword(email: string): void {
    this.store.dispatch(actions.resetPasswordRequest({ email }));
  }

  public dispatchSetNewPassword(userDto: AuthUser): void {
    this.store.dispatch(actions.setNewPasswordRequest({ userDto }));
  }
}
