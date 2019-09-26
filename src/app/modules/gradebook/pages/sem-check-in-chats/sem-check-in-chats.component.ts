import { OnInit, Component, ViewChild, TemplateRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DfModalService } from '@devfactory/ngx-df/modal';
import { DfToasterService, DfLoadingSpinnerService } from '@devfactory/ngx-df';
import { finalize } from 'rxjs/operators';

import { UtilsService } from 'src/app/shared/services/utils.service';
import { SemCheckInChatsService } from 'src/app/shared/services/sem-check-in-chats.service';
import { AccomplishmentsService } from 'src/app/shared/services/accomplishments.service';
import { PlanningService } from 'src/app/shared/services/planning.service';
import { IcWeeklyPlan } from 'src/app/modules/plan/models/ic-weekly-plan.model';

@Component({
  selector: 'app-sem-check-in-chats',
  templateUrl: './sem-check-in-chats.component.html',
  styleUrls: ['./sem-check-in-chats.component.scss']
})
export class SemCheckInChatsComponent implements OnInit {
  private icName: string;
  private dayId: number;

  @ViewChild('checkInChatDetail')
  private checkInChatDetail: TemplateRef<null>;

  public readonly summaryTooltip = `Summary area provides overall performance and
  compliance metrics along with any missing calendar activities for the IC.`;
  public readonly cicTooltip = `Check-in Chat Area provides means to record
  check-in chats provided for the ICs. It should be filled daily. The manager
  can only fill the current day. Missed days will be shown in gray with the
  "Not Done" label whereas completed days will be shown in green with the "Done" label.`;
  public readonly planTooltip = `This section contains daily plans of the ICs for
  weeks. By default current week is expanded. ICs manager can approve or change
  the plan until the end of Tuesday.`;
  public profile: any;
  public daysCompleted: number;
  public productivityScore: number;
  public qualityScore: number;
  public hardestProblems: string[] = [];
  public compliance: any;
  public missingCalendarActivities: any[] = [];
  public plan: IcWeeklyPlan[];

  public loaded = false;
  public weekCheckInChats = [];
  public weeks = [1, 2, 3, 4];

  public constructor(
    private readonly semCheckInChatsService: SemCheckInChatsService,
    private readonly accomplishmentsService: AccomplishmentsService,
    private readonly utilsService: UtilsService,
    private readonly modalService: DfModalService,
    private readonly toasterService: DfToasterService,
    private readonly route: ActivatedRoute,
    private readonly planningService: PlanningService,
    private readonly loadingSpinner: DfLoadingSpinnerService,
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
      this.semCheckInChatsService.getCheckInChats(this.icName),
      this.planningService.getIcPlan(this.icName)
    ).subscribe(([profile, dailyProgressResponse, hardestProblems, compliance, missingCalendarActivities, checkInChats, plan]) => {
      this.profile = profile;
      this.compliance = compliance;
      this.productivityScore = dailyProgressResponse.scoreSummary.approved || 0;
      this.qualityScore = (dailyProgressResponse.qualitySummary.approved || 0) * 100;
      this.hardestProblems = hardestProblems;
      this.missingCalendarActivities = missingCalendarActivities;
      this.weekCheckInChats = checkInChats;
      this.plan = plan;

      this.calculateDaysCompleted();
      this.loaded = true;
    });
  }

  public openDetail(week: number, day: string, id: number, isReadOnly: boolean): void {
    this.dayId = id;
    forkJoin(
      this.semCheckInChatsService.getCheckInChatDetail(week, day, id, this.icName),
      this.planningService.getPlanForDayBefore(id, this.icName)
    )
    .pipe(finalize(() => this.loadingSpinner.hide()))
    .subscribe(([checkInChatDetail, planForDayBefore]) => {
      this.modalService.open(this.checkInChatDetail, {
        backdrop: true,
        data: { week, day, isReadOnly, planForDayBefore, ...checkInChatDetail }
      });
      this.toasterService.popSuccess('Check-in Chat Populated');
    });
  }

  public toggleApproveWeek(week: number): void {
    if (this.plan[week - 1]) {
      const approved = !!this.plan[week - 1].approved;
      this.planningService.toggleApprovePlan(week, !approved, this.icName)
        .pipe(finalize(() => this.loadingSpinner.hide()))
        .subscribe(() => {
          this.plan[week - 1].approved = !approved;
          this.toasterService.popSuccess('Plan approval status updated!');
        },
        error => {
          this.handleError(error);
        });
    }
  }

  public savePlan(): void {
    this.planningService.savePlan(this.plan, this.icName)
      .pipe(finalize(() => this.loadingSpinner.hide()))
      .subscribe(
        () => this.toasterService.popSuccess('Plan saved!'),
        error => {
          this.handleError(error);
        });
  }

  public getButtonText(checkInChat: any): string {
    if (checkInChat.done != null) {
      return `${checkInChat.day}. - ${checkInChat.done ? '' : 'Not'} Done`;
    }
    return `${checkInChat.day}.`;
  }

  public saveCheckInChat(checkInChat: any, close: Function): void {
    checkInChat.Email = this.icName;
    checkInChat.DayId = this.dayId;
    this.semCheckInChatsService.saveCheckInChats(checkInChat)
      .pipe(finalize(() => {
        close();
        this.loadingSpinner.hide();
      }))
      .subscribe(() => {
        this.toasterService.popSuccess('Check-in Chat Saved');
        this.semCheckInChatsService.getCheckInChats(this.icName)
        .pipe(finalize(() => this.loadingSpinner.hide()))
        .subscribe(checkInChatDetail => {
            this.weekCheckInChats = checkInChatDetail;
        });
      });
  }

  public cancelCheckInChat(close: Function): void {
    close();
  }

  private calculateDaysCompleted(): void {
    this.daysCompleted = this.utilsService.calculateDaysCompleted(this.profile.startDate);
  }

  private handleError(error): void {
    let errorMessage = 'Something went wrong';
    if (error && error.error) {
      errorMessage = error.error;
    } else if (error && error.message) {
      errorMessage = error.message;
    }

    this.toasterService.popError(errorMessage);
  }
}
