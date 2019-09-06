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
  private GET_MISSED_CALENDAR_ITEMS = `${environment.apiUrl}/ProfileUserMissedCalendarItem`;
  private GET_PROFILE_COMPLIANCE = `${environment.apiUrl}/ProfileUserCompliance`;

  public constructor(
    private httpClient: HttpClient
  ) {}

  public getAcomplishmentsDailyProgress(icName?: string): Observable<any> {
    const params = this.getIcNameParameter(icName);
    return this.httpClient.get(`${this.GET_PROFILE_ACCOMPLISHMENTS}${params}`);
  }

  public getHardestProblems(icName?: string): Observable<any> {
    const params = this.getIcNameParameter(icName);
    return this.httpClient.get(`${this.GET_HARDEST_PROBLEMS}${params}`);
  }

  public getProfile(icName?: string): Observable<any> {
    const params = this.getIcNameParameter(icName);
    return this.httpClient.get(`${this.GET_PROFILE}${params}`);
  }

  public getHardestProblemsByDay(icName?: string): Observable<any> {
    const params = this.getIcNameParameter(icName);
    return this.httpClient.get(`${this.GET_HARDEST_PROBLEMS_BY_DAY}${params}`);
  }

  public getMissingCalendarActivities(icName: string): Observable<any> {
    const params = this.getIcNameParameter(icName);
    return this.httpClient.get(`${this.GET_MISSED_CALENDAR_ITEMS}${params}`);
  }

  public getCompliance(icName): Observable<any> {
    const params = this.getIcNameParameter(icName);
    return this.httpClient.get(`${this.GET_PROFILE_COMPLIANCE}${params}`);
  }

  private getIcNameParameter(icName?: string) {
    // tslint:disable-next-line:triple-equals
    return icName == undefined ? '' : `/${icName}`;
  }

  private getXoIdParameter(xoId: number) {
    // tslint:disable-next-line:triple-equals
    return xoId == undefined ? 0 : `/${xoId}`;
  }
}
