import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services';

@Injectable()
export class LoginGuard  {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public canActivate(): boolean {
    if (this.authService.isAuthenticated && !this.authService.isTokenExpired()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
