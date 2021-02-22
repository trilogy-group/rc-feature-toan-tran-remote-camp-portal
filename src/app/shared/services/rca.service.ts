import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { RcaItem } from '../model/rca-item';
import { RcaStatus } from '../model/rca-status';

@Injectable()
export class RcaService {
  private readonly mockRcaData: RcaItem[] = [
    {
      ticket: 'REM-385318',
      ticketLink: 'https://crossover.atlassian.net/browse/REM-385318',
      ticketSummary: 'Create a UI prototype for RCA Page',
      riqb: 'RIQB-1290',
      riqbLink: 'https://crossover.atlassian.net/browse/RIQB-1290',
      riqbSummary: 'Pull-Request title should have Jira Issue Key, for instance, "REM-1 <summary>"',
      dayNumber: 1,
      storyOfIncident: 'Story of this incident',
      rootCause: 'Root cause is not re-checking the pull request name rule',
      correctiveAction: 'correct action',
      status: RcaStatus.Repeated
    },
    {
      ticket: 'REM-385315',
      ticketLink: 'https://crossover.atlassian.net/browse/REM-385315',
      ticketSummary: 'Create a Jenkins agent',
      riqb: 'RIQB-1290',
      riqbLink: 'https://crossover.atlassian.net/browse/RIQB-1290',
      riqbSummary: 'Pull-Request title should have Jira Issue Key, for instance, "REM-1 <summary>"',
      dayNumber: 2,
      storyOfIncident: 'Story of Incident is a long story',
      rootCause: 'Root cause',
      correctiveAction: 'correct action',
      status: RcaStatus.Resolved
    },
    {
      ticket: 'REM-385316',
      ticketLink: 'https://crossover.atlassian.net/browse/REM-385316',
      ticketSummary: 'Create a AWS Lambda authorization service',
      riqb: 'RIQB-1292',
      riqbLink: 'https://crossover.atlassian.net/browse/RIQB-1292',
      riqbSummary: 'Pull-Request solves only one JIRA Issue',
      dayNumber: 5,
      storyOfIncident: 'Story of Incident is a very long story',
      rootCause: 'Root cause',
      correctiveAction: 'correct action',
      status: RcaStatus.Resolved
    }
  ];

  constructor() {
  }

  getRcaData(): Observable<RcaItem[]> {
    return of(this.mockRcaData).pipe(
      delay(1500)
    );
  }
}
