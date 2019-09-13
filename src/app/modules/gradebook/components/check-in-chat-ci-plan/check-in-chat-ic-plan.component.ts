import { Component, Input, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';

import { WeeklyPlanComponent } from 'src/app/modules/plan/components/weekly-plan/weekly-plan.component';

@Component({
  selector: 'app-check-in-chat-ic-plan',
  templateUrl: './check-in-chat-ic-plan.component.html',
  styleUrls: ['./check-in-chat-ic-plan.component.scss']
})
export class CheckInChatIcPlanComponent {
  @Input()
  public plan: any;

  @Input()
  public startDate: string;

  @Output()
  public toggleApproveWeekEvent = new EventEmitter<number>();

  @ViewChildren(WeeklyPlanComponent)
  public weeklyPlans: QueryList<WeeklyPlanComponent>;

  public closeOtherAccordions(week: number): void {
    if (this.weeklyPlans) {
      this.weeklyPlans.forEach((weekPlan, index) => {
        if (index + 1 !== week) {
          weekPlan.closeAccordion();
        }
      });
    }
  }

  public toggleApproveWeek(week: number): void {
    this.toggleApproveWeekEvent.emit(week);
  }
}
