import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable()
export class SemCheckInChatsService {
  public constructor(private httpClient: HttpClient) {}

  public getCheckInChats(week: number): Observable<any> {
    return of('');
  }
}
