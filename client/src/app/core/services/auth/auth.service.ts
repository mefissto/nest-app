import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { ConfigService } from '../config.service';
import { CookieService } from '../cookie/cookie.service';

import { AuthUser } from '../../models/auth/auth.model';
import { Token } from '../../models/auth/token.model';
import { AppConstants } from '../../../app.constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly endpoint: string;

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService,
    private readonly cookieService: CookieService,
  ) {
    this.endpoint = `${this.config.host}/auth`;
  }

  get isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private static getTokenExpirationDate(token: string): Date {
    const decoded: { [key: string]: any } = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  login(userDTO: AuthUser): Observable<Token> {
    return this.http
      .post<Token>(`${this.endpoint}/login`, userDTO)
      .pipe(map(token => this.saveToken(token)));
  }

  registration(userDTO: AuthUser): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/registration`, userDTO);
  }

  logout(): void {
    this.cookieService.setCookie(AppConstants.TOKEN_NAME, '');
  }

  isTokenExpired(): boolean {
    const token: string = this.getToken().access_token;
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  private saveToken({ access_token }: Token): Token {
    if (access_token) {
      this.cookieService.setCookie(AppConstants.TOKEN_NAME, access_token);
    }
    return { access_token };
  }

  private getToken(): Token {
    return { access_token: this.cookieService.getCookie(AppConstants.TOKEN_NAME) };
  }
}
