import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthEffects } from '@store/auth/effects/auth.effects';
import { authFeatureKey, authReducer } from './reducers/auth.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [StoreModule],
})
export class AuthStoreModule {}
