import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IcWeeklyPlan } from 'src/app/modules/plan/models/ic-weekly-plan.model';
import { IcDailyPlan } from 'src/app/modules/plan/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlanningService {
  private IC_PLAN = `${environment.apiUrl}/IcWeeklyPlan`;
  private REVIEW_PLAN = `${environment.apiUrl}/WeeklyPlanReview`;
  private IC_PLAN_LASTDAY = (icName, day) =>
  `${environment.apiUrl}/IcWeeklyPlan/${icName}/${day}`
  private IC_PLAN_WITH_EMAIL = icName =>
  `${environment.apiUrl}/IcWeeklyPlan/${icName}`

  public constructor(
    private httpClient: HttpClient
  ) {}

  public getIcPlan(icName?: string): Observable<any> {
    if (!icName) {
      return this.httpClient.get(this.IC_PLAN);
    } else {
      return this.httpClient.get(this.IC_PLAN_WITH_EMAIL(icName), { });
    }
  }

  public savePlan(plan: IcWeeklyPlan[], icName?: string): Observable<any> {
    if (!icName) {
      return this.httpClient.post(this.IC_PLAN, plan);
    } else {
      return this.httpClient.post(this.REVIEW_PLAN, {
        email : icName,
        plans : plan
      });
    }
  }

  public toggleApprovePlan(week: number, approve: boolean, icName: string): Observable<any> {
    return this.httpClient.put(this.REVIEW_PLAN, {
      email : icName,
      isApproved : approve.toString(),
      weekNumber : week.toString()
    });
  }

  public getPlanForDayBefore(day: number, icName: string): Observable<IcDailyPlan> {
    return this.httpClient.get(this.IC_PLAN_LASTDAY(icName, day), { });
  }
}
