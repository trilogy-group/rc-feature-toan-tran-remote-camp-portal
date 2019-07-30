import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class GradebookService {
  public static GET_GRADEBOOK = `${environment.apiUrl}/GradeBook`;

    public constructor(
    private httpClient: HttpClient
  ) {}

  public getGradebookData(): Observable<any> {
    return this.httpClient.get(GradebookService.GET_GRADEBOOK);
  }
}
