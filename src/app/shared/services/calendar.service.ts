import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable()
export class CalendarService {
  private GET_CALENDAR = `${environment.apiUrl}/ProfileUserCalendar`;
  private UPDATE_CALENDAR_ITEM = (userCalendarActionItemId, complete) =>
  `${environment.apiUrl}/UserCalendarItemItem/${userCalendarActionItemId}/${complete}`

  public constructor(
    private httpClient: HttpClient
  ) {}

  public getWeeklyPlanning(): Observable<any> {
    return this.httpClient.get(this.GET_CALENDAR);
  }

  public saveAction(userCalendarActionItemId: number, complete: boolean): Observable<any> {
    return this.httpClient.put(this.UPDATE_CALENDAR_ITEM(userCalendarActionItemId, complete), {});
  }
}
