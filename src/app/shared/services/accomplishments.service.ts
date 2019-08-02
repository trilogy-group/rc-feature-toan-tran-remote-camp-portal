import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable()
export class AccomplishmentsService {
  private GET_PROFILE = `${environment.apiUrl}/profile`;
  private GET_HARDEST_PROBLEMS = `${environment.apiUrl}/ProfileHardestProblems`;
  private GET_PROFILE_ACCOMPLISHMENTS = `${environment.apiUrl}/ProfileAccomplishments`;
  private GET_HARDEST_PROBLEMS_BY_DAY = `${environment.apiUrl}/ProfileHardestProblemsByDay`;
  private readonly moduleDistributionMock = [{
    module: 'Test Execution',
    qualityDistribution: [0.43, 0.43, 0.43],
    scoreDistribution: [0.5, 1.2, 1.3]
  }, {
    module: 'Test Writing',
    qualityDistribution: [0.25, 0.25, 0.25],
    scoreDistribution: [0.2, 0.3, 0.4]
  }];
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

  private getIcNameParameter(icName?: string) {
    // tslint:disable-next-line:triple-equals
    return icName == undefined ? '' : `/${icName}`;
  }
}
