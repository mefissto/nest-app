import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private endpoint: string;

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService,
  ) {
    this.endpoint = `${this.config.host}/users`;
  }

  fetchUsers(): Observable<any> {
    return this.http.get(`${this.endpoint}`);
  }
}
