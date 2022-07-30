import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from '@auth/auth-routing.module';

import { AuthComponent } from '@auth/auth.component';
import {
  AuthSocialIconsComponent,
  AuthSubmitButtonComponent,
  LoginComponent,
  RegistrationComponent,
  ResetPasswordComponent,
  SetNewPasswordComponent,
} from '@auth/components';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    AuthSubmitButtonComponent,
    AuthSocialIconsComponent,
    ResetPasswordComponent,
    SetNewPasswordComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
