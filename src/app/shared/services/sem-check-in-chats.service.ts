import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SemCheckInChatsService {
  private GET_CHECk_In_CHAT = `${environment.apiUrl}/ProfileUserCheckInChat`;
  private POST_CHECk_In_CHAT = `${environment.apiUrl}/ProfileUserCheckInChat`;
  public constructor(private httpClient: HttpClient) {}

  public getCheckInChats(xoId: number): Observable<any> {
    const params = this.getXoIdParameter(xoId);
    return this.httpClient.get(`${this.GET_CHECk_In_CHAT}${params}`);
  }

  public saveCheckInChats(checkInChat: { week: number, day: string, coachedOn: string,
     comments: string, rcXoId: number, dayId: number }): Observable<any> {
     console.log(checkInChat);
     return this.httpClient.post(this.POST_CHECk_In_CHAT, checkInChat);
  }

  public getCheckInChatDetail(week: number, day: string, id: number, xoId: number): Observable<any> {
    const paramXoId = this.getXoIdParameter(xoId);
    const paramDay = this.getXoIdParameter(id);
    return this.httpClient.get(`${this.GET_CHECk_In_CHAT}${paramXoId}${paramDay}`);
  }

  private getXoIdParameter(xoId: number) {
    // tslint:disable-next-line:triple-equals
    return xoId == undefined ? 0 : `/${xoId}`;
  }

  private getDayParameter(day: number) {
    // tslint:disable-next-line:triple-equals
    return day == undefined ? 0 : `/${day}`;
  }
}
