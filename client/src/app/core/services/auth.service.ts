import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AuthUser } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private endpoint: string;

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService
  ) {
    this.endpoint = `${this.config.host}/auth`;
  }

  login(userDTO: AuthUser) {
    console.log('userDTO: ', userDTO);
    return this.http.post(`${this.endpoint}/login`, userDTO);
  }

  registration(userDTO: AuthUser) {
    return this.http.post(`${this.endpoint}/registration`, userDTO);
  }
}
