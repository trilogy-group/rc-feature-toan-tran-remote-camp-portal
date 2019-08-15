import { OnInit, Component, ViewChild, TemplateRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DfModalService } from '@devfactory/ngx-df/modal';
import { DfToasterService, DfLoadingSpinnerService } from '@devfactory/ngx-df';
import { finalize } from 'rxjs/operators';

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
  private xoId: number;
  private dayId: number;

  @ViewChild('checkInChatDetail')
  private checkInChatDetail: TemplateRef<null>;

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

  public constructor(
    private readonly semCheckInChatsService: SemCheckInChatsService,
    private readonly accomplishmentsService: AccomplishmentsService,
    private readonly utilsService: UtilsService,
    private modalService: DfModalService,
    private toasterService: DfToasterService,
    private route: ActivatedRoute,
    private readonly loadingSpinner: DfLoadingSpinnerService,
  ) {
    this.icName = this.route.snapshot.queryParams['icName'];
    this.xoId = this.route.snapshot.queryParams['xoId'];
  }

  public ngOnInit(): void {
    forkJoin(
      this.accomplishmentsService.getProfile(this.icName),
      this.accomplishmentsService.getAcomplishmentsDailyProgress(this.icName),
      this.accomplishmentsService.getHardestProblems(this.icName),
      this.accomplishmentsService.getCompliance(this.icName),
      this.accomplishmentsService.getMissingCalendarActivities(this.xoId),
      this.semCheckInChatsService.getCheckInChats(this.xoId)
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

  public openDetail(week: number, day: string, id: number, isReadOnly: boolean): void {
    this.dayId = id;
    this.semCheckInChatsService.getCheckInChatDetail(week, day, id, this.xoId)
    .pipe(finalize(() => this.loadingSpinner.hide()))
    .subscribe(checkInChatDetail => {
      console.log(checkInChatDetail);
      this.modalService.open(this.checkInChatDetail, {
        backdrop: true,
        data: { week, day, isReadOnly, ...checkInChatDetail }
      });
      this.toasterService.popSuccess('Check-in Chat Populated');
    });
  }

  public getButtonText(checkInChat: any): string {
    if (checkInChat.done != null) {
      return `${checkInChat.day}. - ${checkInChat.done ? '' : 'Not'} Done`;
    }
    return `${checkInChat.day}.`;
  }

  public saveCheckInChat(checkInChat: any, close: Function): void {
    checkInChat.RcXoId = this.xoId;
    checkInChat.DayId = this.dayId;
    this.semCheckInChatsService.saveCheckInChats(checkInChat)
      .pipe(finalize(() => {
        close();
        this.loadingSpinner.hide();
      }))
      .subscribe(() => this.toasterService.popSuccess('Check-in Chat Saved'));
  }

  public cancelCheckInChat(close: Function): void {
    close();
  }

  private calculateDaysCompleted(): void {
    this.daysCompleted = this.utilsService.calculateDaysCompleted(this.profile.startDate);
  }
}
