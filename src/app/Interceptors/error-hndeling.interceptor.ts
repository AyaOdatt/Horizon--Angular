import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorHndelingInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        debugger;
        let msg = '';
        switch (error.status) {
          case 404:
            this.router.navigate(['/notFound']);
            break;
          case 401:
            this.router.navigate(['/unauthorized']);
            break;
          case 403:
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: ' Invalid username or password',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'invalid operation ',
            });
            break;
        }
        return throwError(msg);
      })
    );
  }
}
