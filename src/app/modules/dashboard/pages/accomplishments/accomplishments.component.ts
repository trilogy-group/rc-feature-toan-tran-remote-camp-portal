import { OnInit, Component, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DfToasterService } from '@devfactory/ngx-df/toaster';
import {
  DF_COLORS, DfLegendAlignment,
  DfLegendOptions,
  DfLineChartConfiguration,
  DfLineChartScaleType,
  DfLoadingSpinnerService,
  DfPlacement
} from '@devfactory/ngx-df';
import { finalize } from 'rxjs/operators';

import { AccomplishmentsService } from 'src/app/shared/services/accomplishments.service';
import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-accomplishments',
  templateUrl: './accomplishments.component.html',
  styleUrls: ['./accomplishments.component.scss']
})
export class AccomplishmentsComponent implements OnInit {
  public readonly FTAR = 'FTAR';
  public readonly score = 'Score';
  public readonly ftarYes = 'FTAR Yes';
  public readonly ftarNo = 'FTAR No';
  public readonly approved = 'Approved';
  public readonly inReview = 'In Review';
  public readonly toDo = 'To Do';
  public readonly inProgress = 'In Progress';
  public readonly productivityDisplayTypes = [
    { text: '', id: 0, icon: 'fa fa-line-chart' },
    { text: '', id: 1, icon: 'fa fa-th' },
  ];

  public readonly tmsTooltip = `Time Motion Study (TMS) contains the average duration that
  is spent for each sub-task for producing a high-quality deliverable unit.
  The spreadsheet is organized in weeks and helps ICs to improve their TMS by analyzing and acting on the long time taking tasks.`;

  public readonly deckTooltip = `RemoteU final delivery presentation (Deck) contains the presentation of
  the improvements, innovations made,  takeaways gathered and scores achieved during the time spent in RemoteU.`;

  public readonly problemResolutionProgressTooltip = `This table displays the quality failures per each day.
  QB failures that happened during the last 5 days are considered as unresolved are marked with a red exclamation
  mark for all the occurrences starting from the start date of RemoteU.
  Resolved QB failures are displayed with a green tick sign.`;

  public readonly overallHardestProblemsTooltip = 'It displays the main QB failures of IC during RemoteU.';

  public readonly productivityTargetTooltip = `This chart displays on top as a text, scores that should have been earned until the
  last completed day of the IC in the RemoteU. In the chart view, user can see a distribution of all tickets which are Approved,
  Submitted (In Review) or being worked on (In Progress).`;

  public readonly qualityTargetTooltip = `This chart displays on top as a text, Quality that should have been achieved until
  the last completed day of the IC in the RemoteU. In the pie chart view, user can see a distribution of all tickets with FTAR
  (First Time Acceptance Rate) = YES and with FTAR=NO.`;

  public readonly qualityColors = [
    DF_COLORS.GREEN,
    DF_COLORS.RED,
  ];
  public readonly productivityColors = [
    DF_COLORS.GREEN,
    DF_COLORS.YELLOW,
    DF_COLORS.BLUE
  ];

  @Input()
  public icName: string;

  public loaded = false;

  public dailyProgressChartOptions = new DfLineChartConfiguration();

  public currentProductivityDisplay: string;
  public accomplishmentsSummary: any[] = [];
  public dailyProgress: any[] = [];
  public dailyProgressChart: any[] = [];
  public productivityChart = [];
  public qualityChart = [];
  public qualityTarget: number;
  public productivityTarget: number;
  public hardestProblems = [];
  public hardestProblemsByDay = [];
  public qualityDistribution = [];
  public scoreDistribution = [];

  public daysCompleted: number;
  public profile: any = { };
  public weeks = [0, 1, 2, 3];
  public showWelcome: boolean;
  public productivityChartLegendOptions: DfLegendOptions = new DfLegendOptions();

  constructor(
    private readonly accomplishmentsService: AccomplishmentsService,
    private readonly toasterService: DfToasterService,
    private readonly loadingSpinner: DfLoadingSpinnerService,
    private readonly authenticationTokenService: AuthenticationTokenService,
    private readonly utilsService: UtilsService
  ) {}

  public ngOnInit(): void {
    this.dailyProgressChartOptions.xAxisScale = DfLineChartScaleType.Linear;
    this.dailyProgressChartOptions.showDots = true;
    this.showWelcome = localStorage.getItem('showWelcomeMessage') === 'true';
    localStorage.removeItem('showWelcomeMessage');
    forkJoin(
      this.accomplishmentsService.getHardestProblems(this.icName ? this.icName : undefined),
      this.accomplishmentsService.getProfile(this.icName ? this.icName : undefined),
      this.accomplishmentsService.getAcomplishmentsDailyProgress(this.icName ? this.icName : undefined),
      this.accomplishmentsService.getHardestProblemsByDay(this.icName ? this.icName : undefined)
    )
    .pipe(finalize(() => this.loadingSpinner.hide()))
    .subscribe(([hardestProblems, profile, dailyProgressResponse, hardestProblemsByDay]) => {
      this.hardestProblems = hardestProblems;
      this.profile = profile;
      this.calculateDaysCompleted();

      const weeklyQuality = dailyProgressResponse.weekly.map(week => week.quality != null ? week.quality * 100 : null);
      const weeklyProductivity = dailyProgressResponse.weekly.map(week => week.productivity ? week.productivity : 0);
      const weeklyFtar = dailyProgressResponse.qualitySummary.approved != null ?
      dailyProgressResponse.qualitySummary.approved * 100 :
       null;
      this.accomplishmentsSummary.push({
        stat: this.FTAR,
        values: weeklyQuality,
        average: weeklyFtar
      });

      this.accomplishmentsSummary.push({
        stat: this.score,
        values: weeklyProductivity,
        average: weeklyProductivity.reduce((a, b) => (a + b)) / (weeklyProductivity.length || 1)
      });

      this.qualityDistribution = dailyProgressResponse.moduleDistribution.map(distribution => {
        const distributionObject = {
          stat: this.FTAR,
          distribution: distribution.qualityDistribution.map(value => value != null ? value * 100 : null),
          average:  distribution.moduleTotalAverageFtar != null ? distribution.moduleTotalAverageFtar * 100 : null,
          module: distribution.module
        };
        return distributionObject;
      });

       this.scoreDistribution = dailyProgressResponse.moduleDistribution.map(distribution => {
        const distributionObject = {
          stat: this.score,
          distribution: distribution.scoreDistribution,
          average: distribution.scoreDistribution.reduce((a, b) => (a + b)) / (distribution.scoreDistribution.length || 1),
          module: distribution.module
        };
        return distributionObject;
      });

      this.productivityTarget = dailyProgressResponse.scoreSummary.targetForToday;
      this.qualityTarget = dailyProgressResponse.qualitySummary.targetForToday * 100;
      let day = 1;
      this.dailyProgress = dailyProgressResponse.daily.map(
        dailyObject => {
          if (dailyObject.quality != null) {
            dailyObject.quality = dailyObject.quality * 100;
          }
          return { day: day++, ...dailyObject };
        }
      );

      this.dailyProgressChart = this.dailyProgress.map(dailyObject => {
        return {
          'xKey': `Day ${dailyObject.day.toString()}`,
          'Productivity': dailyObject.productivity.toFixed(2),
          'Quality': dailyObject.quality != null ? (dailyObject.quality / 100).toFixed(2) : 1,
          'Planned Productivity': dailyObject.plannedProductivity ? dailyObject.plannedProductivity.toFixed(2) : undefined
        };
      });

      this.dailyProgress = this.dailyProgress.reverse();

      const productivityApproved = dailyProgressResponse.scoreSummary.approved || 0;
      const productivityInReview = dailyProgressResponse.scoreSummary.inReview || 0;
      const productivityInProgress = dailyProgressResponse.scoreSummary.inProgress || 0;
      const ftarYes = dailyProgressResponse.qualitySummary.approved || 0;

      this.productivityChart.push({ xKey: this.approved, yKey: Number(productivityApproved.toFixed(2)) });
      this.productivityChart.push({ xKey: this.inReview, yKey: Number(productivityInReview.toFixed(2)) });
      this.productivityChart.push({ xKey: this.inProgress, yKey: Number(productivityInProgress.toFixed(2)) });

      this.qualityChart.push({ title: `${this.ftarYes} ${Math.round(ftarYes * 100)}%`, value: Number(ftarYes.toFixed(2)) });
      this.qualityChart.push({ title: `${this.ftarNo} ${Math.round((1 - ftarYes) * 100)}%`, value: Number((1 - ftarYes).toFixed(2)) });
      this.hardestProblemsByDay = hardestProblemsByDay;
      this.productivityChartLegendOptions.legendPosition = DfPlacement.TopCenter;
      this.productivityChartLegendOptions.legendAlignment = DfLegendAlignment.Horizontal;

      this.loaded = true;

      if (this.showWelcome && !this.authenticationTokenService.isUserAdmin()) {
        this.toasterService.popSuccess(`Welcome Back ${this.profile.name}!`);
      }
    }, () => this.toasterService.popError('Something went wrong'));
  }

  public onDailyProgressDisplayChange(text: string): void {
    this.currentProductivityDisplay = text;
  }

  public getDistributionByRow(statistic: any): any {
    return statistic === this.FTAR ? this.qualityDistribution : this.scoreDistribution;
  }

  public isAdmin(): boolean {
    return this.authenticationTokenService.isUserAdmin();
  }

  private calculateDaysCompleted(): void {
    this.daysCompleted = this.utilsService.calculateDaysCompleted(this.profile.startDate);
  }
}
