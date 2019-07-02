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
}
