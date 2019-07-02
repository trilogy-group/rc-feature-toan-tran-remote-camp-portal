import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss']
})
export class WeeklyCalendarComponent implements OnInit {
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

  public readonly TOTAL = 'Total';

  public ngOnInit(): void {
    this.weekPlanning.week.forEach(plan => {
      const duration = plan.actions.map(action => action.duration).reduce((durationA, durationB) => durationA + durationB);
      plan.actions.push({
        description: this.TOTAL,
        duration: duration,
      });
    });
  }

  public updateAction(action: any, complete: any): void {
    action.complete = complete;
    this.updateActionEvent.emit(action);
  }
}
