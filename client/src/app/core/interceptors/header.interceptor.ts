import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { CookieService } from '../services/cookie/cookie.service';
import { AppConstants } from './../../app.constants';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private readonly cookieService: CookieService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cookieService.getCookie(AppConstants.TOKEN_NAME)}`,
      },
    });
    return next.handle(cloneReq);
  }
}
