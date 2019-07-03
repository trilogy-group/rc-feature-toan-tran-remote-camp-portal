import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProfileService {
  private readonly profile = {
    xoId: 'John Smith',
    jiraId: 'John Smith',
    companyEmail: 'john.smith@aurea.com',
    icName: 'John Smith',
  };

  public getProfile(): Observable<any> {
    return of(this.profile);
  }

  public saveProfile(profile: any): Observable<any> {
    return of('');
  }
}
