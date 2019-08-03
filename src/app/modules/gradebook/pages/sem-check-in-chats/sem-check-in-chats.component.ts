import { OnInit, Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { UtilsService } from 'src/app/shared/services/utils.service';
import { SemCheckInChatsService } from 'src/app/shared/services/sem-check-in-chats.service';
import { AccomplishmentsService } from 'src/app/shared/services/accomplishments.service';

@Component({
  selector: 'app-sem-check-in-chats',
  templateUrl: './sem-check-in-chats.component.html',
  styleUrls: ['./sem-check-in-chats.component.scss']
})
export class SemCheckInChatsComponent implements OnInit {
  private icName: string;

  public profile: any;
  public daysCompleted: number;
  public productivityScore: number;
  public qualityScore: number;
  public hardestProblems: string[] = [];
  public compliance: any;
  public missingCalendarActivities: any[] = [];

  public loaded = false;
  public weekCheckInChats = [];
  public weeks = [1, 2, 3, 4];
  public currentWeek = 1;

  public constructor(
    private readonly semCheckInChatsService: SemCheckInChatsService,
    private readonly accomplishmentsService: AccomplishmentsService,
    private readonly utilsService: UtilsService,
    private route: ActivatedRoute
  ) {
    this.icName = this.route.snapshot.queryParams['icName'];
  }

  public ngOnInit(): void {
    forkJoin(
      this.accomplishmentsService.getProfile(this.icName),
      this.accomplishmentsService.getAcomplishmentsDailyProgress(this.icName),
      this.accomplishmentsService.getHardestProblems(this.icName),
      this.accomplishmentsService.getCompliance(this.icName),
      this.accomplishmentsService.getMissingCalendarActivities(this.icName),
      this.semCheckInChatsService.getCheckInChats(this.currentWeek)
    ).subscribe(([profile, dailyProgressResponse, hardestProblems, compliance, missingCalendarActivities, checkInChats]) => {
      this.profile = profile;
      this.compliance = compliance;
      this.productivityScore = dailyProgressResponse.scoreSummary.approved || 0;
      this.qualityScore = (dailyProgressResponse.qualitySummary.approved || 0) * 100;
      this.hardestProblems = hardestProblems;
      this.missingCalendarActivities = missingCalendarActivities;
      this.weekCheckInChats = checkInChats;

      this.calculateDaysCompleted();
      this.loaded = true;
    });
  }

  public nextWeek(): void {
    this.currentWeek++;
    this.semCheckInChatsService.getCheckInChats(this.currentWeek).subscribe(checkInChats => this.weekCheckInChats);
  }

  public previousWeek(): void {
    this.currentWeek--;
    this.semCheckInChatsService.getCheckInChats(this.currentWeek).subscribe(checkInChats => this.weekCheckInChats);
  }

  private calculateDaysCompleted(): void {
    this.daysCompleted = this.utilsService.calculateDaysCompleted(this.profile.startDate);
  }
}
