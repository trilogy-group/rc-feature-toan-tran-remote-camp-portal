import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DfHttpSkipInterceptorEnum } from '@devfactory/ngx-df/interceptor';

import { environment } from 'src/environments/environment';
import { IssueType } from 'src/app/modules/onboard/models';

@Injectable()
export class OnboardingService {

  private static readonly itSystemsAccessGet = environment.itSystemAccessGetUrl;
  private static readonly remoteUMaterialsReportIssueGet = environment.remoteUMaterialsReportIssueGetUrl;
  private static readonly preStartConfirmAccessesGet = environment.preStartConfirmAccessesGetUrl;
  private static readonly preStartConfirmAccessesPut = environment.preStartConfirmAccessesPutUrl;
  private static readonly codeRepositoryIssueGet = environment.codeRepositoryIssueGetUrl;
  private static readonly checkAssignmentFolderGetUrl = environment.checkAssignmentFolderGetUrl;
  private static readonly reportIssuePost = environment.reportIssuePostUrl;
  private static readonly readyToStartGetUrl = environment.readyToStartGetUrl;
  private static readonly jiraStatusGetUrl = environment.jiraStatusGetUrl;
  private static readonly ticketsAssignedGetUrl = environment.ticketsAssignedGetUrl;
  private static readonly remoteUCodeRepoAccessUrl = environment.remoteUCodeRepoAccess;
  private static readonly communicationChannelAccessUrl = environment.communicationChannelAccessUrl;

  private preStartInfo = {
    accesses: {
    },
    accessesConfirmed: false,
    ticketsAssigned: false,
    assignmentFolder: true,
    readyToStart: false
  };

  public constructor(private httpClient: HttpClient) { }

  public getPreStartInfo(): Observable<any> {
    return of(this.preStartInfo);
  }

  public getItSystemAccess(name: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${OnboardingService.itSystemsAccessGet}?name=${name}`, options);
  }

  public confirmAccesses(email: string): Observable<any> {
    return this.httpClient.put(`${OnboardingService.preStartConfirmAccessesPut}`, { email });
  }

  public getAccessesConfirmed(email: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${OnboardingService.preStartConfirmAccessesGet}?email=${email}`, options);
  }

  public reportItSystemsIssue(icName: string, ad: string): Observable<any> {
    const body = { icName, ad, issueType: IssueType.itSystemsAccess };
    return this.httpClient.post(OnboardingService.reportIssuePost, body);
  }

  public reportRemoteUMaterialsIssue(icName: string, companyEmail: string): Observable<any> {
    const body = { icName, companyEmail, issueType: IssueType.remoteUMaterials };
    return this.httpClient.post(OnboardingService.reportIssuePost, body);
  }

  public reportCodeRepositoryIssue(ad: string, icName: string, companyEmail: string): Observable<any> {
    const payload = { icName, companyEmail, issueType: 'codeRepo' };
    return this.httpClient.post(`${OnboardingService.reportIssuePost}`, payload);
  }

  public getReportCodeRepositoryIssue(email: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${OnboardingService.codeRepositoryIssueGet}?email=${email}`, options);
  }

  public getRemoteUCodeBaseAccess(email: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${OnboardingService.remoteUCodeRepoAccessUrl}?email=${email}`, options);
  }

  public getRemoteUMaterialsAccess(email: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${OnboardingService.remoteUMaterialsReportIssueGet}?email=${email}`, options);
  }

  public getAssignmentFolder(icName: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${OnboardingService.checkAssignmentFolderGetUrl}?name=${icName}`, options);
  }

  public getReadyToStart(email: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${OnboardingService.readyToStartGetUrl}?email=${email}`, options);
  }

  public getJiraStatus(icName: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${OnboardingService.jiraStatusGetUrl}?name=${icName}`, options);
  }

  public getTicketsAssigned(email: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${OnboardingService.ticketsAssignedGetUrl}?email=${email}`, options);
  }

  public getCommunicationChannelAccess(email: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${OnboardingService.communicationChannelAccessUrl}?email=${email}`, options);
  }

  private getSkipLoaderHeaders(): any {
    const options = { headers: {}};
    options['headers'][DfHttpSkipInterceptorEnum.LoaderInterceptor] = '';

    return options;
  }
}
