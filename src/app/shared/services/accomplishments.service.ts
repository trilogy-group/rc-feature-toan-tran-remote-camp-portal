import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable()
export class AccomplishmentsService {
  private GET_PROFILE = `${environment.apiUrl}/profile`;
  private GET_HARDEST_PROBLEMS = `${environment.apiUrl}/ProfileHardestProblems`;
  private GET_PROFILE_ACCOMPLISHMENTS = `${environment.apiUrl}/ProfileAccomplishments`;
  private GET_HARDEST_PROBLEMS_BY_DAY = `${environment.apiUrl}/ProfileHardestProblemsByDay`;

  public constructor(
    private httpClient: HttpClient
  ) {}

  public getAcomplishmentsDailyProgress(email?: string): Observable<any> {
    const params = this.getIcNameParameter(email);
    return this.httpClient.get(this.GET_PROFILE_ACCOMPLISHMENTS, { params: params });
  }

  public getHardestProblems(email?: string): Observable<any> {
    const params = this.getIcNameParameter(email);
    return this.httpClient.get(this.GET_HARDEST_PROBLEMS, { params: params });
  }

  public getProfile(email?: string): Observable<any> {
    const params = this.getIcNameParameter(email);
    return this.httpClient.get(this.GET_PROFILE, { params: params });
  }

  public getHardestProblemsByDay(email?: string): Observable<any> {
    const params = this.getIcNameParameter(email);
    return this.httpClient.get(this.GET_HARDEST_PROBLEMS_BY_DAY, { params: params });
  }

  private getIcNameParameter(email?: string) {
    return new HttpParams().set('email', email === undefined ? '' : email);
  }
}
