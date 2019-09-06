import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SemCheckInChatsService {
  private GET_CHECk_In_CHAT = `${environment.apiUrl}/ProfileUserCheckInChat`;
  private POST_CHECk_In_CHAT = `${environment.apiUrl}/ProfileUserCheckInChat`;
  public constructor(private httpClient: HttpClient) {}

  public getCheckInChats(icName: string): Observable<any> {
    const params = this.getIcNameParameter(icName);
    return this.httpClient.get(`${this.GET_CHECk_In_CHAT}${params}`);
  }

  public saveCheckInChats(checkInChat: { week: number, day: string, coachedOn: string,
     comments: string, rcXoId: number, dayId: number }): Observable<any> {
     return this.httpClient.post(this.POST_CHECk_In_CHAT, checkInChat);
  }

  public getCheckInChatDetail(week: number, day: string, id: number, icName: string): Observable<any> {
    const paramicName = this.getIcNameParameter(icName);
    const paramDay = this.getDayParameter(id);
    return this.httpClient.get(`${this.GET_CHECk_In_CHAT}${paramicName}${paramDay}`);
  }

  private getIcNameParameter(icName?: string) {
    // tslint:disable-next-line:triple-equals
    return icName == undefined ? '' : `/${icName}`;
  }

  private getDayParameter(day: number) {
    // tslint:disable-next-line:triple-equals
    return day == undefined ? 0 : `/${day}`;
  }
}
