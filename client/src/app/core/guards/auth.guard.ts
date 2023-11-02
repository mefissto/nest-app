import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services';

@Injectable()
export class AuthGuard  {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public canActivate(): boolean {
    if (this.authService.isAuthenticated && !this.authService.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['auth/login']);
    return false;
  }
}
