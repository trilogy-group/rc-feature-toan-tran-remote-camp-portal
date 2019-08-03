import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable()
export class AccomplishmentsService {
  private MISSED_CALENDAR_ITEMS_MOCK = [{
    week: 1,
    day: 'Monday',
    name: 'Get the list of assignments (jira) and go through it	'
  }, {
    week: 2,
    day: 'Monday',
    name: 'Make a weekly plan of deliveries. Recommended distribution of load is: 10/30/30/20/10+fix+catchup.'
  }];
  private COMPLIANCE_MOCK = {
    focus: 0.87,
    intensity: 0.8,
    alignment: 0.9
  };

  private GET_PROFILE = `${environment.apiUrl}/profile`;
  private GET_HARDEST_PROBLEMS = `${environment.apiUrl}/ProfileHardestProblems`;
  private GET_PROFILE_ACCOMPLISHMENTS = `${environment.apiUrl}/ProfileAccomplishments`;
  private GET_HARDEST_PROBLEMS_BY_DAY = `${environment.apiUrl}/ProfileHardestProblemsByDay`;

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

  public getMissingCalendarActivities(icName): Observable<any> {
    return of(this.MISSED_CALENDAR_ITEMS_MOCK);
  }

  public getCompliance(icName): Observable<any> {
    return of(this.COMPLIANCE_MOCK);
  }

  private getIcNameParameter(icName?: string) {
    // tslint:disable-next-line:triple-equals
    return icName == undefined ? '' : `/${icName}`;
  }
}
