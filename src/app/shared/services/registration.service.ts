import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DfFileUploaderUtils, DfFile, removeTimezoneOffset, DfHttpSkipInterceptorEnum } from '@devfactory/ngx-df';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class RegistrationService {
  public static IcPipeline = `${environment.apiUrl}/IcPipeline`;
  public static Registration = `${environment.apiUrl}/Registration`;
  public static GitHubUsernameCheck = `https://api.github.com/users/`;

  public constructor(private httpClient: HttpClient) { }

  public doesGitHubUsernameExist(username: string): Observable<any> {
    const options = this.getSkipLoaderHeaders();
    return this.httpClient.get(`${RegistrationService.GitHubUsernameCheck}${username}`, options)
    .pipe(
      map((response: any) =>
        of(!!response && !!response.login)
      )
    );
  }

  public getAvailableRoles(): Observable<any> {
    return this.httpClient.get(RegistrationService.IcPipeline);
  }

  public submit(signupData: any, contract: DfFile): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, */*'
    });

    const formData = new FormData();
    if (contract && contract.file) {
      formData.append('contract', contract.file);
      contract.setInProgress();
    }

    const cloneSignUpData = JSON.parse(JSON.stringify(signupData));
    cloneSignUpData.startDate = removeTimezoneOffset(cloneSignUpData.startDate);

    formData.append('signUpData', JSON.stringify(cloneSignUpData));

    return this.httpClient.post(RegistrationService.Registration, formData, {
      headers: headers,
      reportProgress: true
    })
      .pipe(
        catchError(error => {
          DfFileUploaderUtils.OnHttpErrorHandler(error, contract);
          return throwError(error);
        })
      );
  }

  private getSkipLoaderHeaders(): any {
    const options = { headers: {}};
    options['headers'][DfHttpSkipInterceptorEnum.LoaderInterceptor] = '';

    return options;
  }
}
