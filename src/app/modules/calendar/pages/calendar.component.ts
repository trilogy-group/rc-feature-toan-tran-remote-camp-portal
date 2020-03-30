import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { cloneDeep } from 'lodash';
import { forkJoin } from 'rxjs';

import { CalendarService } from 'src/app/shared/services/calendar.service';
import { WeeklyCalendarComponent } from '../components/weekly-calendar/weekly-calendar.component';
import { ProfileService } from 'src/app/shared/services/profile.service';

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
  public weekIndexOffset = 0;
  public startDate: string;

  @ViewChildren(WeeklyCalendarComponent)
  public weeks: QueryList<WeeklyCalendarComponent>;

  constructor(
    private calendarService: CalendarService,
    private profileService: ProfileService
  ) { }

  public ngOnInit(): void {
    forkJoin(
      this.calendarService.getWeeklyPlanning(),
      this.profileService.getProfile()
    )
    .subscribe(([weeklyPlanning, profile]) => {
      this.startDate = profile.startDate;
      this.weeklyPlanning = cloneDeep(weeklyPlanning);
      if (this.weeklyPlanning.length <= 4) {
        this.weekIndexOffset = 1;
      }
    });
  }

  public updateAction(action: any): void {
    this.calendarService.saveAction(action.userCalendarActionItemId, action.isCompleted).subscribe();
  }

  public closeOtherAccordions(weekNumber: number): void {
    this.weeks.forEach((week, index) => {
      if (index + 1 !== weekNumber) {
        week.closeAccordion();
      }
    });
  }
}
