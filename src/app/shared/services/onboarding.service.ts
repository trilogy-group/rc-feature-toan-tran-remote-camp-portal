import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { addDays } from 'date-fns';

@Injectable()
export class OnboardingService {
  private onboardStatus = {
    name: 'Jane Smith',
    pipeline: 'QA Manual Tester',
    startDate: addDays(new Date(), 2),
    alternativeEmail: 'janesmith@email.com',
    email: 'jane.smith@aurea.com',
    accesses: {
      itSystems: true,
      remoteUMaterials: true,
      codeRepository: true,
      jira: true,
    },
    accessesConfirmed: false,
    ticketsAssigned: false,
    assignmentFolder: true,
    welcomeEmailSent: true
  };

  public constructor(private httpClient: HttpClient) { }

  public getOnboardStatus(): Observable<any> {
    return of(this.onboardStatus);
  }

  public confirmAccesses(): Observable<any> {
    return of('');
  }
}
