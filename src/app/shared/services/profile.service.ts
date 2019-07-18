import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable()
export class ProfileService {
  private GET_PROFILE_SETTINGS = `${environment.apiUrl}/Profile`;

  public constructor(private httpClient: HttpClient) { }

  public getProfile(): Observable<any> {
    return this.httpClient.get(this.GET_PROFILE_SETTINGS);
  }

  public saveProfile(profile: any): Observable<any> {
    return of('');
  }
}
