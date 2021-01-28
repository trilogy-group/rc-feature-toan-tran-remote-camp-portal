import { Injectable } from '@angular/core';
import { AuthenticationTokenService } from './authentication-token.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
  private LOGIN = `${environment.apiUrl}/AuthenticationGoogleToken`;
  private IMPERSONATE = `${environment.apiUrl}/Impersonation`;
  private RENEW_TOKEN = `${environment.apiUrl}/AuthenticationJwt`;

  public constructor(
    private authenticationTokenService: AuthenticationTokenService,
    private httpClient: HttpClient
  ) {}

  public login(token: string): Observable<any> {
    return this.httpClient.post(this.LOGIN, JSON.stringify(token))
      .pipe(map(response => this.authenticationTokenService.saveToken(response.toString())));
  }

  public impersonate(email: string): Observable<any> {
    return this.httpClient.post(this.IMPERSONATE, JSON.stringify(email))
      .pipe(map(response => this.authenticationTokenService.saveToken(response.toString())));
  }

  public renewToken(): Observable<any> {
    return this.httpClient.post(this.RENEW_TOKEN, null)
        .pipe(map(response => this.authenticationTokenService.saveToken(response.toString())));
  }
}
