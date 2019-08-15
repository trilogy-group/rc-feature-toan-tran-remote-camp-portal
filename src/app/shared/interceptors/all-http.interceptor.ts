import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';

@Injectable()
export class AllHttpInterceptor implements HttpInterceptor {
  constructor(private readonly authenticationTokenService: AuthenticationTokenService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = {};

    if (request.headers.has('Accept')) {
      if (!!request.headers.get('Accept')) {
        headers['Accept'] = request.headers.get('Accept');
      }
    }
    else {
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';
    }

    const token = this.authenticationTokenService.getToken();
    if (!!token) {
      headers['Authorization'] = `Bearer ${this.authenticationTokenService.getToken()}`;
    }

    request = request.clone({ setHeaders: headers });
    return of(request).pipe(
      switchMap((requestWithHeaders: HttpRequest<any>) => next.handle(requestWithHeaders)),
      catchError(error => this.handleError(request, error, next))
    );
  }

  private handleError(request: HttpRequest<any>, error: any, next: HttpHandler): Observable<HttpEvent<any>> {
    if (error.status === 401 || error.status === 403) {
      this.authenticationTokenService.logout();
    }
    return throwError(error);
  }
}
