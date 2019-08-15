import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpHeaderResponse } from '@angular/common/http';
import { DfFileUploadService, DfFileUploaderUtils, DfFile } from '@devfactory/ngx-df';
import { filter, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable()
export class ProfileService {
  public static GET_PROFILE_SETTINGS = `${environment.apiUrl}/Profile`;
  public static SAVE_PROFILE = `${environment.apiUrl}/Profile`;

  public constructor(private httpClient: HttpClient, private fileUploadService: DfFileUploadService) { }

  public getProfile(): Observable<any> {
    return this.httpClient.get(ProfileService.GET_PROFILE_SETTINGS);
  }

  public saveProfile(profile: any, fileToUpload: DfFile): Observable<any> {
    DfFileUploadService.prototype.postFile = (url, file, reqHeaders) => {
      const headers = reqHeaders.set('Accept', 'application/json, text/plain, */*');

      const formData = new FormData();
      if (file && file.file) {
        formData.append('files', file.file);
        file.setInProgress();
      }
      formData.append('profile', JSON.stringify(profile));
      const req = new HttpRequest('POST', url, formData, {
        headers: headers,
        reportProgress: true,
      });
      return this.httpClient.request(req);
    };
    return this.fileUploadService
      .postFile(ProfileService.SAVE_PROFILE, fileToUpload, new HttpHeaders(), 'file')
      .pipe(
        filter(response => {
          return response instanceof HttpHeaderResponse;
        }),
        map((response: HttpHeaderResponse) => {
          return response.headers.get('Location');
        }),
        catchError(error => {
          DfFileUploaderUtils.OnHttpErrorHandler(error, fileToUpload);
          return of('');
        })
      );
  }
}
