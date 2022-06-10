import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class ConfigService {
  get host(): string {
    return `${environment.host}/api/v1`;
  }
}
