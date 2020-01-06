import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DfHttpSkipInterceptorEnum } from '@devfactory/ngx-df/interceptor';

@Injectable()
export class AdminService {

  private static readonly knowledgeBaseUrl = environment.knowledgeBaseUrl;
  private static readonly knowledgeBaseStatusUrl = environment.knowledgeBaseStatusUrl;

  public constructor(private httpClient: HttpClient) { }

  public refreshKnowledgeBase(): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.post(AdminService.knowledgeBaseUrl, {}, options);
  }

  public getRefreshKnowledgeBaseStatus(executionArn: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.post(
      AdminService.knowledgeBaseStatusUrl,
      { executionArn }, options);
  }

   private getSkipLoaderHeaders(): any {
    const options = { headers: {}};
    options['headers'][DfHttpSkipInterceptorEnum.LoaderInterceptor] = '';

    return options;
  }
}
