import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';

import { CalendarService } from 'src/app/shared/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public weeklyPlanning = [];
  public week0 = [];
  public week1 = [];
  public week2 = [];
  public week3 = [];
  public week4 = [];

  constructor(private calendarService: CalendarService) { }

  public ngOnInit(): void {
    this.calendarService.getWeeklyPlanning().subscribe(weeklyPlanning => {
      this.weeklyPlanning = cloneDeep(weeklyPlanning);
    });
  }

  public updateAction(action: any): void {
    this.calendarService.saveAction(action.userCalendarActionItemId, action.isCompleted).subscribe();
  }
}
