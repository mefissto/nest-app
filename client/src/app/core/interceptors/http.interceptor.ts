import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({
      setHeaders: { 'Access-Control-Allow-Origin': '*' },
    });
    console.log('cloneReq: ', cloneReq);
    return next.handle(cloneReq);
  }
}
