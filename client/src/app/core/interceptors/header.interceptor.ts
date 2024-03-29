import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CookieService } from '@core/services';
import { TOKEN_NAME } from '@constants';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private readonly cookieService: CookieService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cookieService.getCookie(TOKEN_NAME)}`,
      },
    });

    return next.handle(cloneReq);
  }
}
