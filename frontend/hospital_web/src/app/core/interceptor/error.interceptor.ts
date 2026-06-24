import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        // auto logout if 401 response returned from local api
        // but NOT for external AI APIs
        if (!req.url.includes('openai.com') && !req.url.includes('googleapis.com')) {
          authService.logout();
          location.reload();
        }
      }

      const error = err.error?.message || err.statusText;
      return throwError(() => error);
    })
  );
};
