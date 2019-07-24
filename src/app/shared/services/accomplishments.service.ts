import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  public getAcomplishmentsDailyProgress(icName?: string): Observable<any> {
    return this.httpClient.get(this.GET_PROFILE_ACCOMPLISHMENTS);
  }

  public getHardestProblems(icName?: string): Observable<any> {
    return this.httpClient.get(this.GET_HARDEST_PROBLEMS);
  }

  public getProfile(icName?: string): Observable<any> {
    return this.httpClient.get(this.GET_PROFILE);
  }

  public getHardestProblemsByDay(icName?: string): Observable<any> {
    return this.httpClient.get(this.GET_HARDEST_PROBLEMS_BY_DAY);
  }
}
