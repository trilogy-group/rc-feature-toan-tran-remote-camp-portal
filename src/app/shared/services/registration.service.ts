import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpHeaderResponse } from '@angular/common/http';
import { DfFileUploadService, DfFileUploaderUtils, DfFile } from '@devfactory/ngx-df';
import { of, Observable } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class RegistrationService {
  public static IcPipeline = `${environment.apiUrl}/IcPipeline`;
  public static Registration = `${environment.apiUrl}/Registration`;

  public constructor(private httpClient: HttpClient, private fileUploadService: DfFileUploadService) { }

  public getAvailableRoles(): Observable<any> {
    return this.httpClient.get(RegistrationService.IcPipeline);
  }

  public submit(signupData: any, video: DfFile, contract: DfFile): Observable<any> {
    var headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, */*'
    });

    const formData = new FormData();
    if (video && video.file) {
      formData.append('video', video.file);
      video.setInProgress();
    }

    if (contract && contract.file) {
      formData.append('contract', contract.file);
      contract.setInProgress();
    }

    formData.append('signUpData', JSON.stringify(signupData));

    return this.httpClient.post(RegistrationService.Registration, formData, {
      headers: headers,
      reportProgress: true
    })
      .pipe(
        filter(response => {
          return response instanceof HttpHeaderResponse;
        }),
        map((response: HttpHeaderResponse) => {
          return response.headers.get('Location');
        }),
        catchError(error => {
          DfFileUploaderUtils.OnHttpErrorHandler(error, video);
          DfFileUploaderUtils.OnHttpErrorHandler(error, contract);
          return of('');
        })
      );
  }
}
