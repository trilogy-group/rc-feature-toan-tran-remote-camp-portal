import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AccomplishmentsService {
  private hardestProblemsByDayMock = [{
    items: [{
      jiraKey: 'RIQB-90248',
      resolved: true
    }, {
      jiraKey: 'RIQB-300',
    }, {
      jiraKey: 'RIQB-401',
      resolved: true
    }, {
      jiraKey: 'RIQB-601',
      resolved: true
    }, {
      jiraKey: 'RIQB-701',
      resolved: true
    }]
  }, {
    items: []
  }, {
    items: [{
      jiraKey: 'RIQB-300',
    }]
  }, {
    items: []
  }, {
    items: []
  }, {
    items: []
  }, {
    items: []
  }, {
    items: []
  }, {
    items: [{
      jiraKey: 'RIQB-301',
      resolved: true
    }]
  }, {
    items: []
  }, {
    items: [{
      jiraKey: 'RIQB-90248',
      resolved: true
    }, {
      jiraKey: 'RIQB-300'
    }, {
      jiraKey: 'RIQB-401',
      resolved: true
    }, {
      jiraKey: 'RIQB-601',
      resolved: true
    }, {
      jiraKey: 'RIQB-701',
      resolved: true
    }]
  }, {
    items: []
  }, {
    items: [{
      jiraKey: 'RIQB-300',
    }]
  }, {
    items: []
  }, {
    items: []
  }, {
    items: []
  }, {
    items: []
  }, {
    items: []
  }, {
    items: []
  }, {
    items: [{
      jiraKey: 'RIQB-300',
    }]
  }];

  private api = 'https://dev-remoteu.trilogy.com/api';
  private GET_PROFILE = `${this.api}/profile`;
  private GET_HARDEST_PROBLEMS = `${this.api}/ProfileHardestProblems`;
  private GET_PROFILE_ACCOMPLISHMENTS = `${this.api}/ProfileAccomplishments`;


  public constructor(
    private http: HttpClient
  ) {}

  public getAcomplishmentsDailyProgress(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(this.GET_PROFILE_ACCOMPLISHMENTS, { headers });
  }

  public getHardestProblems(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(this.GET_HARDEST_PROBLEMS, { headers });
  }

  public getProfile(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(this.GET_PROFILE, { headers });
  }

  public getHardestProblemsByDay(): Observable<any> {
    return of(this.hardestProblemsByDayMock);
  }

  private createAuthorizationHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
      'content-type': 'application/json',
    });
    return headers;
  }
}
