import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { AuthUser } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private endpoint: string;

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService,
  ) {
    this.endpoint = `${this.config.host}/auth`;
  }

  login(userDTO: AuthUser): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.endpoint}/login`, userDTO);
  }

  registration(userDTO: AuthUser): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/registration`, userDTO);
  }


}
