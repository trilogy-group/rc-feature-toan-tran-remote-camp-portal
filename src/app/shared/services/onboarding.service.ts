import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DfHttpSkipInterceptorEnum } from '@devfactory/ngx-df/interceptor';
import { environment } from 'src/environments/environment';

@Injectable()
export class OnboardingService {
  private static readonly itSystemsAccess = environment.itSystemAccessStatusUrl;
  private static readonly remoteUMaterialsAccess = environment.remoteUMaterialsAccessStatusUrl;
  private static readonly codeRepositoryAccess = environment.codeRepositoryAccessStatusUrl;

  private preStartInfo = {
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

  public getItSystemAccess(ad: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${OnboardingService.itSystemsAccess}?name=${ad}`, options);
  }

  public getRemoteUMaterialsAccess(AD: string, email: string): Observable<any> {
    const body = { AD, email };
    const options = this.getSkipLoaderHeaders();

    return this.httpClient.get(`${OnboardingService.remoteUMaterialsAccess}?name=${email}`, options);
  }

  public getCodeRepositoryAccess(AD: string, email: string): Observable<any> {
    const body = { AD, email };
    const options = this.getSkipLoaderHeaders();

    return this.httpClient.get(`${OnboardingService.codeRepositoryAccess}?name=${email}`, options);
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
