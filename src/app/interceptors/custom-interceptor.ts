import { HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/authservice';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError, Observable } from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);
const excludedUrls: string[] = ['/api/users/login', '/api/users/refreshToken'];

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const isExcluded = excludedUrls.some(url => req.url.includes(url));
  const authService = inject(AuthService);
  const token = authService.getToken();
  let clonedReq = req;

  if (token && !isExcluded) {
    clonedReq = req.clone({
      withCredentials: true,
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedReq).pipe<HttpEvent<unknown>>(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(clonedReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

// Helper function to handle token rotation safely
function handle401Error(req: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<unknown>> {
  console.log('Handling 401 error, attempting to refresh token...', isRefreshing);
  if (!isRefreshing) {
    console.log('inside refreshing...');
    isRefreshing = true;
    refreshTokenSubject.next(null);

    // Call the backend refresh endpoint. 
    // The browser will automatically attach the HttpOnly refresh cookie!
    return authService.refreshAccessToken().pipe(
      switchMap((response: { access_token: string }) => {
        console.log("back end response from refresh token endpoint:", response);
        isRefreshing = false;
        
        // Save the new access token returned in the JSON payload
        authService.setToken(response.access_token); 
        refreshTokenSubject.next(response.access_token);

        // Retry the original request with the new token
        return next(req.clone({
          headers: req.headers.set('Authorization', `Bearer ${response.access_token}`)
        }));
      }),
      catchError((refreshError) => {
        isRefreshing = false;
        authService.logout(); // Refresh token expired/invalid, clear session
        return throwError(() => refreshError);
      })
    );
  } else {
    // If a refresh is already in progress, wait for the new token to arrive
    return refreshTokenSubject.pipe(
      filter((token): token is string => token !== null),
      take(1),
      switchMap((token) => {
        return next(req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        }));
      })
    );
  }
};
