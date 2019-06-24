import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var signOut: any;

@Injectable()
export class AuthenticationService {
  private userMock = {
    icName: 'John Smith',
    dateStarted: '2019/06/10',
    daysCompleted: 3,
    pipeline: 'QA Automation Engineer',
    deckUrl: '',
    tmsUrl: ''
  };

  private LOGIN = `${environment.apiUrl}/AuthenticationGoogleToken`;
  private IMPERSONATE = `${environment.apiUrl}/Impersonation`;

  public constructor(
    private _router: Router,
    private http: HttpClient
  ) {}

  public static getToken(): string {
    return localStorage.getItem('sesssionToken');
  }

  public setToken(token: string, userData: any): void {
    localStorage.setItem('crossoverBootcampUserToken', token);
    localStorage.setItem('crossoverBootcampUserData', JSON.stringify(userData));
    localStorage.setItem('icName', this.userMock.icName);
    localStorage.setItem('dateStarted', this.userMock.dateStarted);
    localStorage.setItem('daysCompleted', this.userMock.daysCompleted.toString());
    localStorage.setItem('pipeLine', this.userMock.pipeline);
    localStorage.setItem('deckUrl', this.userMock.deckUrl);
    localStorage.setItem('tmsUrl', this.userMock.tmsUrl);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('sessionToken');
  }

  public logout(): void {
    localStorage.removeItem('sessionToken');
    signOut();
  }

  public login(token: string): Observable<any> {
    const headers = this.getCommonHeaders();
    return this.http.post(this.LOGIN, JSON.stringify(token), { headers });
  }

  public impersonate(email: string): Observable<any> {
    const headers = this.getCommonHeadersWithAuthorization();
    return this.http.post(this.IMPERSONATE, JSON.stringify(email), { headers });
  }

  private getCommonHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'accept': 'application/json'
    });
    return headers;
  }

  private getCommonHeadersWithAuthorization(): HttpHeaders {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
    });
    return headers;
  }
}
