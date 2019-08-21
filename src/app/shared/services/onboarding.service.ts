import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { addDays } from 'date-fns';
import { DfHttpSkipInterceptorEnum } from '@devfactory/ngx-df/interceptor';

@Injectable()
export class OnboardingService {
  private static readonly itSystemsAccess = 'https://cl2w37ym50.execute-api.us-east-1.amazonaws.com/development/check-ad';
  private static readonly remoteUMaterialsAccess = '';
  private static readonly codeRepositoryAccess = 'https://5n8scr6il7.execute-api.us-east-1.amazonaws.com/development/git-verify';

  private preStartInfo = {
    name: 'Jane Smith',
    pipeline: 'QA Manual Tester',
    startDate: addDays(new Date(), 2),
    alternativeEmail: 'janesmith@email.com',
    email: 'a.ahmad@aurea.com',
    ad: 'a.ahmad',
    accesses: {
    },
    accessesConfirmed: false,
    ticketsAssigned: false,
    assignmentFolder: true,
    welcomeEmailSent: true
  };

  public constructor(private httpClient: HttpClient) { }

  public getPreStartInfo(): Observable<any> {
    return of(this.preStartInfo);
  }

  public getItSystemAccess(AD: string, email: string): Observable<any> {
    const body = { AD, email };
    const options = this.getSkipLoaderHeaders();

    return this.httpClient.post(OnboardingService.itSystemsAccess, body, options);
  }

  public getRemoteUMaterialsAccess(AD: string, email: string): Observable<any> {
    const body = { AD, email };
    const options = this.getSkipLoaderHeaders();

    return this.httpClient.post(OnboardingService.remoteUMaterialsAccess, body, options);
  }

  public getCodeRepositoryAccess(AD: string, email: string): Observable<any> {
    const body = { AD, email };
    const options = this.getSkipLoaderHeaders();

    return this.httpClient.post(OnboardingService.codeRepositoryAccess, body, options);
  }

  public confirmAccesses(): Observable<any> {
    return of('');
  }

  private getSkipLoaderHeaders(): any {
    const options = { headers: {}};
    options['headers'][DfHttpSkipInterceptorEnum.LoaderInterceptor] = '';

    return options;
  }
}
