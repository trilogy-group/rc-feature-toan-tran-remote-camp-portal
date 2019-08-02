import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class GradebookService {
  public static GET_GRADEBOOK = `${environment.apiUrl}/GradeBook`;
  public static GET_IC_GRADEBOOK = `${environment.apiUrl}/IcGradeBook`;

    public constructor(
    private httpClient: HttpClient
  ) {}

  public getGradebookData(isAdmin: boolean = true): Observable<any> {
    return this.httpClient.get(isAdmin ? GradebookService.GET_GRADEBOOK : GradebookService.GET_IC_GRADEBOOK);
  }
}
