import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService, AuthService, UserService, ConfigService } from '@core/services';

const SERVICES = [CookieService, AuthService, UserService, ConfigService];

@NgModule({
  imports: [CommonModule],
  providers: [...SERVICES],
})
export class CoreModule {}
