import { Component, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { isMonday, isTuesday } from 'date-fns';
import { DfAccordion } from '@devfactory/ngx-df/accordion';

import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-weekly-plan',
  templateUrl: './weekly-plan.component.html',
  styleUrls: ['./weekly-plan.component.scss']
})
export class WeeklyPlanComponent implements AfterViewInit {
  private readonly approveButtonText = 'Approve';
  private readonly undoApproveButtonText = 'Undo Approval';

  @Input()
  public plan: any;

  @Input()
  public week: number;

  @Input()
  public startDate: string;

  @Input()
  public isAdmin = false;

  public today = new Date();

  @Output()
  public closeOtherAccordionsEvent = new EventEmitter<number>();

  @Output()
  public toggleApproveWeekEvent = new EventEmitter<number>();

  @ViewChild('planAccordion')
  public planAccordion: DfAccordion;

  constructor(
    private readonly utilsService: UtilsService,
  ) {}

  public ngAfterViewInit(): void {
    if (this.isCurrentWeek() && this.planAccordion) {
      this.planAccordion.panels.forEach(panel => panel.openPanel());
    }
  }

  public onWeekPanelOpen(): void {
    this.closeOtherAccordionsEvent.emit(this.week);
  }

  public isCurrentWeek(): boolean {
    return this.utilsService.getCurrentWeek(this.startDate) === this.week;
  }

  public getApproveButtonText(): string {
    return this.plan.approved ? this.undoApproveButtonText : this.approveButtonText;
  }

  public toggleApproveWeek(event: any): void {
    this.toggleApproveWeekEvent.emit(this.week);
    event.stopPropagation();
  }

  public showApproveButton(): boolean {
    return this.isCurrentWeek() && this.isAdmin;
  }

  public isDisabled(): boolean {
    const currentWeek = this.utilsService.getCurrentWeek(this.startDate);

    if (this.plan.approved) {
      return true;
    }

    if (this.week > currentWeek) {
      return false;
    } else if (this.week < currentWeek) {
      return true;
    }

    return !isMonday(this.today) && !isTuesday(this.today);
  }

  public isTextAreaDisabled(): boolean {
    return this.isDisabled();
  }

  public updateDayPlanScoreTarget(dayPlan: any, scoreTarget: any): void {
    dayPlan.scoreTarget = Number(scoreTarget.target.value);
  }

  public updateDayPlanSummary(dayPlan: any, summary: any): void {
    dayPlan.summary = summary.target.value;
  }

  public closeAccordion(): void {
    this.planAccordion.panels.forEach(panel => panel.closePanel());
  }
}
