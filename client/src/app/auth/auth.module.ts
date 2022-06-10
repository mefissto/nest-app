import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from '@auth/auth-routing.module';

import { AuthComponent } from '@auth/auth.component';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegistrationComponent } from '@auth/components/registration/registration.component';
import { AuthSubmitButtonComponent } from '@auth/components/auth-submit-button/auth-submit-button.component';
import { AuthSocialIconsComponent } from '@auth/components/auth-social-icons/auth-social-icons.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    AuthSubmitButtonComponent,
    AuthSocialIconsComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
