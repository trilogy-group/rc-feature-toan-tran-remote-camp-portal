import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiClientService } from './api-client.service';

@Injectable()
export class AccomplishmentsService {
  private GET_PROFILE = 'profile';
  private GET_HARDEST_PROBLEMS = 'ProfileHardestProblems';
  private GET_PROFILE_ACCOMPLISHMENTS = 'ProfileAccomplishments';
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
    private apiClient: ApiClientService
  ) {}

  public getAcomplishmentsDailyProgress(): Observable<any> {
    return this.apiClient.get(this.GET_PROFILE_ACCOMPLISHMENTS);
  }

  public getHardestProblems(): Observable<any> {
    return this.apiClient.get(this.GET_HARDEST_PROBLEMS);
  }

  public getProfile(): Observable<any> {
    return this.apiClient.get(this.GET_PROFILE);
  }

  public getHardestProblemsByDay(): Observable<any> {
    return of(this.hardestProblemsByDayMock);
  }
}
