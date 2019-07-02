import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { AuthenticationTokenService } from './authentication-token.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  private LOGIN = `AuthenticationGoogleToken`;
  private IMPERSONATE = `Impersonation`;

  public constructor(
    private apiClient: ApiClientService,
    private authenticationTokenService: AuthenticationTokenService
  ) {}

  public login(token: string): Observable<any> {
    return this.apiClient.post(this.LOGIN, JSON.stringify(token))
      .pipe(map(response => this.authenticationTokenService.saveToken(response.toString())));
  }

  public impersonate(email: string): Observable<any> {
    return this.apiClient.post(this.IMPERSONATE, JSON.stringify(email))
      .pipe(map(response => this.authenticationTokenService.saveToken(response.toString())));
  }
}
