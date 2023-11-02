import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthStoreModule } from './auth/auth-store.module';

@NgModule({
  imports: [
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument(),
    AuthStoreModule,
  ],
  exports: [StoreModule],
})
export class AppStoreModule {}
