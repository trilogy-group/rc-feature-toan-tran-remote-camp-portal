import { Component, Input, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { DfAccordion } from '@devfactory/ngx-df/accordion';

import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss']
})
export class WeeklyCalendarComponent implements OnInit, AfterViewInit {
  private _weekPlanning = [];

  @Input()
  public set weekPlanning(value: any) {
    this._weekPlanning = value;
  }

  public get weekPlanning(): any {
    return this._weekPlanning;
  }

  @Input()
  public index: number;

  @Output()
  public updateActionEvent = new EventEmitter<{}>();

  @Output()
  public openWeekEvent = new EventEmitter<{}>();

  @Input()
  public startDate: string;

  @ViewChild('weekAccordion')
  public weekAccordion: DfAccordion;

  public readonly TOTAL = 'Total';

  constructor(
    private readonly utilsService: UtilsService,
  ) {}

  public ngOnInit(): void {
    if (this.weekPlanning && this.weekPlanning.week) {
      this.weekPlanning.week.forEach(plan => {
        const duration = plan.actions.map(action => action.duration).reduce((durationA, durationB) => durationA + durationB);
        plan.actions.push({
          description: this.TOTAL,
          position: Number.MAX_SAFE_INTEGER,
          duration,
        });
      });
    }
  }

  public ngAfterViewInit(): void {
    if (this.isCurrentWeek() && this.weekAccordion) {
      this.weekAccordion.panels.forEach(panel => panel.openPanel());
    }
  }

  public updateAction(action: any, isCompleted: any): void {
    action.isCompleted = isCompleted;
    this.updateActionEvent.emit(action);
  }

  public openWeek(): void {
    this.openWeekEvent.emit(this.index);
  }

  public closeAccordion(): void {
    this.weekAccordion.panels.forEach(panel => panel.closePanel());
  }

  public isCurrentWeek(): boolean {
    return this.utilsService.getCurrentWeek(this.startDate) === this.index;
  }
}
