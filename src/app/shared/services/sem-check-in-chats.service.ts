import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable()
export class SemCheckInChatsService {
  private checkInChatsMock = [
    [
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
    ],
    [
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
      },
      {
        day: 'Fri',
      }
    ],
    [
      {
        day: 'Mon',
      },
      {
        day: 'Tue',
      },
      {
        day: 'Wed',
      },
      {
        day: 'Thurs',
      },
      {
        day: 'Fri',
      }
    ],
    [
      {
        day: 'Mon',
      },
      {
        day: 'Tue',
      },
      {
        day: 'Wed',
      },
      {
        day: 'Thurs',
      },
      {
        day: 'Fri',
      }
    ],
  ];

  public constructor(private httpClient: HttpClient) {}

  public getCheckInChats(): Observable<any> {
    return of(this.checkInChatsMock);
  }

  public saveCheckInChats(checkInChat: { week: number, day: string, coachedOn: string, comments: string }): Observable<any> {
    return of('');
  }

  public getCheckInChatDetail(week: number, day: string): Observable<any> {
    return of({ coachedOn: 'quality', coachingComments: 'this is a comment' });
  }
}
