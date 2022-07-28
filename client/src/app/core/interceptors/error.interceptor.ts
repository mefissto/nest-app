import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SnackbarService } from '@core/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackbar: SnackbarService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: () => null,
        error: (error: HttpErrorResponse) => {
          let errorMsg = 'Something went wrong!';
          if (error.error instanceof ErrorEvent) {
            errorMsg = 'An error occurred on the client side';
          } else {
            errorMsg = error?.error?.message || errorMsg;
          }
          this.snackbar.error(errorMsg);
        },
      })
    );
  }
}
