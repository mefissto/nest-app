import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@core/services';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public canActivate(): boolean {
    if (this.authService.isAuthenticated && !this.authService.isTokenExpired()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
