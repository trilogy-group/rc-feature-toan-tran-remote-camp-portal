import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable()
export class AccomplishmentsService {
  private GET_PROFILE = `${environment.apiUrl}/profile`;
  private GET_HARDEST_PROBLEMS = `${environment.apiUrl}/ProfileHardestProblems`;
  private GET_PROFILE_ACCOMPLISHMENTS = `${environment.apiUrl}/ProfileAccomplishments`;
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

  public constructor(
    private httpClient: HttpClient
  ) {}

  public getAcomplishmentsDailyProgress(): Observable<any> {
    return this.httpClient.get(this.GET_PROFILE_ACCOMPLISHMENTS);
  }

  public getHardestProblems(): Observable<any> {
    return this.httpClient.get(this.GET_HARDEST_PROBLEMS);
  }

  public getProfile(): Observable<any> {
    return this.httpClient.get(this.GET_PROFILE);
  }

  public getHardestProblemsByDay(): Observable<any> {
    return of(this.hardestProblemsByDayMock);
  }
}
