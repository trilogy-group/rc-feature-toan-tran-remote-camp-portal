import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AccomplishmentsService {
  private userProfile = {
    icName: 'John Smith',
    dateStarted: '2019/06/22',
    daysCompleted: '4',
    pipeline: 'QA Manual Tester',
    deckUrl: '',
    tmsUrl: '',
  };

  private readonly scoreMock = {
    total: 2.4,
    pending: 1.2,
    daysCompleted: 4,
    weekly: [2.4],
    average: 2.4
  };
  private readonly ftarMock = {
    weekly: [1.0],
    average: 1.0
  };
  private readonly dailyProgressMock = {
    daily: [{
      productivity: 0,
      quality: null
    }, {
      productivity: 0,
      quality: null
    }, {
      productivity: 2.4,
      quality: 1.0
    }],
    qualitySummary: {
      approved: 1.0,
      targetForToday: 0.9
    },
    scoreSummary: {
      approved: 2.4,
      inReview: 1.2,
      inProgress: 0,
      toDo: 18,
      targetForToday: 3.4,
    }
  };
  private readonly hardestProblems = [{
    name: 'RIQB-190',
    summary: 'No commented out code',
    description: '',
    failedInJiraLink: `https://crossover.atlassian.net/issues/?
    jql=project%20%3D%20rem%20AND%20key%20in%20(%27REM-123%27%2C%20%27REM-543%27%2C%20%27REM-567%27)`,
    failedIn: [{
      name: 'REM-123',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    }, {
      name: 'REM-543',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    }, {
      name: 'REM-567',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    }]
  }, {
    name: 'RIQB-299',
    summary: 'PR19: Bad selectors',
    description: '',
    failedInJiraLink: `https://crossover.atlassian.net/issues/?
    jql=project%20%3D%20rem%20AND%20key%20in%20(%27REM-123%27%2C%20%27REM-543%27%2C%20%27REM-567%27)`,
    failedIn: [{
      name: 'REM-123',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    }, {
      name: 'REM-543',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    }]
  }, {
    name: 'RIQB-288',
    summary: 'Expectation Helper Usage',
    description: '',
    failedInJiraLink: `https://crossover.atlassian.net/issues/?
    jql=project%20%3D%20rem%20AND%20key%20in%20(%27REM-123%27%2C%20%27REM-543%27%2C%20%27REM-567%27)`,
    failedIn: [{
      name: 'REM-567',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    }]
  }];

  private GET_FTAR_SUMMARY = `${environment.apiUrl}/`;
  private GET_SCORE_SUMMARY = `${environment.apiUrl}/`;
  private GET_PROFILE = `${environment.apiUrl}/profile`;
  private GET_HARDEST_PROBLEMS = `${environment.apiUrl}/`;
  private GET_DAILY_PROGRESS = `${environment.apiUrl}/`;

  public constructor(
    private http: HttpClient
  ) {}

  public getScoreSummary(icName: string): Observable<any> {
    // const headers = this.createAuthorizationHeader();
    // return this.http.get(this.GET_SCORE_SUMMARY, { headers })
    //   .pipe(map(() => this.scoreMock));
    return of(this.scoreMock);
  }

  public getFtarSummary(icName: string): Observable<any> {
    // const headers = this.createAuthorizationHeader();
    // return this.http.get(this.GET_FTAR_SUMMARY, { headers })
    //   .pipe(map(() => this.ftarMock));
    return of(this.ftarMock);
  }

  public getAcomplishmentsDailyProgress(icName: string): Observable<any> {
    // const headers = this.createAuthorizationHeader();
    // return this.http.get(this.GET_DAILY_PROGRESS, { headers })
    //   .pipe(map(() => this.dailyProgressMock));
    return of(this.dailyProgressMock);
  }

  public getHardestProblems(icName: string): Observable<any> {
    // const headers = this.createAuthorizationHeader();
    // return this.http.get(this.GET_HARDEST_PROBLEMS, { headers })
    //   .pipe(map(() => this.hardestProblems));
    return of(this.hardestProblems);
  }

  public getProfile(): Observable<any> {
    // const headers = this.createAuthorizationHeader();
    // return this.http.get(this.GET_PROFILE, { headers })
    //   .pipe(map(() => this.userProfile));
    return of(this.userProfile);
  }

  private createAuthorizationHeader(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${localStorage.getItem('sessionToken')}`);
    return headers;
  }
}
