import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";

import { ConfigService, CookieService } from '@core/services';
import { AuthUser } from '@models/auth/auth.model';
import { AuthResponse } from '@models/auth/token.model';
import { TOKEN_NAME } from '@constants';

@Injectable()
export class AuthService {
  private readonly endpoint: string;

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService,
    private readonly cookieService: CookieService
  ) {
    this.endpoint = `${this.config.host}/auth`;
  }

  get isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private static getTokenExpirationDate(token: string): Date {
    const decoded: { [key: string]: unknown } = jwtDecode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp as number);
    return date;
  }

  public login(userDTO: AuthUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.endpoint}/login`, userDTO).pipe(tap((token) => this.saveToken(token)));
  }

  public registration(userDTO: AuthUser): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/registration`, userDTO);
  }

  public resetPassword(email: string): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${this.endpoint}/reset-password`, { email });
  }

  public setNewPassword(user: AuthUser): Observable<void> {
    return this.http.patch<void>(`${this.endpoint}/set-new-password`, user);
  }

  public logout(): void {
    this.cookieService.setCookie(TOKEN_NAME, '');
  }

  public isTokenExpired(): boolean {
    const token: string = this.getToken().access_token;
    if (!token) {
      return true;
    }

    const date = AuthService.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  private saveToken({ access_token }: AuthResponse): void {
    if (access_token) {
      this.cookieService.setCookie(TOKEN_NAME, access_token);
    }
  }

  private getToken(): AuthResponse {
    return { access_token: this.cookieService.getCookie(TOKEN_NAME) };
  }
}
