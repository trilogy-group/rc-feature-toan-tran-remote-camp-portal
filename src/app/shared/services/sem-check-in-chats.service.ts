import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable()
export class SemCheckInChatsService {
  private checkInChatsMock = [
    {
      day: 'Mon',
      done: true
    },
    {
      day: 'Tue',
      done: false
    },
    {
      day: 'Wed',
      done: false
    },
    {
      day: 'Thurs',
      done: false
    },
    {
      day: 'Fri',
      done: false
    }
  ];

  public constructor(private httpClient: HttpClient) {}

  public getCheckInChats(week: number): Observable<any> {
    return of(this.checkInChatsMock);
  }
}
