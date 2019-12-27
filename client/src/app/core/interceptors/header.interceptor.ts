import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie/cookie.service';

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
        Authorization: `Bearer ${this.cookieService.getCookie('token')}`,
      },
    });
    console.log('cloneReq: ', cloneReq);
    return next.handle(cloneReq);
  }
}
