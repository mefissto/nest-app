import { Token } from './../models/auth/token.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigService } from './config.service';
import { AuthUser } from '../models/auth/auth.model';
import { CookieService } from './cookie/cookie.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private endpoint: string;

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService,
    private readonly cookieService: CookieService,
  ) {
    this.endpoint = `${this.config.host}/auth`;
  }

  login(userDTO: AuthUser): Observable<Token> {
    return this.http
      .post<Token>(`${this.endpoint}/login`, userDTO)
      .pipe(map(token => this.saveToken(token)));
  }

  registration(userDTO: AuthUser): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/registration`, userDTO);
  }

  private saveToken({ access_token }: Token): Token {
    if (access_token) {
      this.cookieService.setCookie('token', access_token);
    }
    return { access_token };
  }
}
