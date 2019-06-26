import { OnInit, Component } from '@angular/core';
import { AccomplishmentsService } from 'src/app/shared/services/accomplishments.service';
import { forkJoin } from 'rxjs';
import { differenceInDays, parse } from 'date-fns';
import { DfToasterService } from '@devfactory/ngx-df/toaster';
import { DF_COLORS, DfLineChartConfiguration, DfLineChartScaleType, DfLoadingSpinnerService } from '@devfactory/ngx-df';
import { finalize } from 'rxjs/operators';

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
    { text: 'TABLE', id: 1, icon: 'fa fa-th' },
    { text: 'CHART', id: 0, icon: 'fa fa-line-chart' },
  ];

  public readonly qualityColors = [
    DF_COLORS.GREEN,
    DF_COLORS.RED,
  ];
  public readonly productivityColors = [
    DF_COLORS.GREEN,
    DF_COLORS.YELLOW,
    DF_COLORS.BLUE,
    DF_COLORS.LIGHT_GREY,
  ];
  public loaded = false;

  dailyProgressChartOptions = new DfLineChartConfiguration();

  public currentProductivityDisplay: string;
  public accomplishmentsSummary: any[] = [];
  public dailyProgress: any[] = [];
  public dailyProgressChart: any[] = [];
  public productivityChart = [];
  public qualityChart = [];
  public qualityTarget: number;
  public productivityTarget: number;
  public hardestProblems = [];

  public daysCompleted: number;
  public profile: any = { };

  constructor(
    private readonly accomplishmentsService: AccomplishmentsService,
    private readonly toasterService: DfToasterService,
    private readonly loadingSpinner: DfLoadingSpinnerService,
  ) {}

  public ngOnInit(): void {
    this.dailyProgressChartOptions.xAxisScale = DfLineChartScaleType.Linear;
    this.dailyProgressChartOptions.showDots = true;

    forkJoin(
      this.accomplishmentsService.getHardestProblems(),
      this.accomplishmentsService.getProfile(),
      this.accomplishmentsService.getAcomplishmentsDailyProgress()
    )
    .pipe(finalize(() => this.loadingSpinner.hide()))
    .subscribe(([hardestProblems, profile, dailyProgressResponse]) => {
      this.hardestProblems = hardestProblems;
      this.profile = profile;
      this.calculateDaysCompleted();

      const weeklyQuality = dailyProgressResponse.weekly.map(week => week.quality ? week.quality * 100 : 100);
        this.accomplishmentsSummary.push({
          stat: this.FTAR,
          values: weeklyQuality,
          average: weeklyQuality.reduce((a, b) => (a + b)) / (weeklyQuality.length || 1)
        });

        const weeklyProductivity = dailyProgressResponse.weekly.map(week => week.productivity ? week.productivity : 0);
        this.accomplishmentsSummary.push({
          stat: this.score,
          values: weeklyProductivity,
          average: weeklyProductivity.reduce((a, b) => (a + b)) / (weeklyProductivity.length || 1)
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
            xKey: `Day ${dailyObject.day.toString()}`,
            productivity: dailyObject.productivity.toFixed(2),
            quality: dailyObject.quality ?  (dailyObject.quality / 100).toFixed(2) : 1
          };
        });

        this.dailyProgress = this.dailyProgress.reverse();

        const productivityApproved = dailyProgressResponse.scoreSummary.approved || 0;
        const productivityInReview = dailyProgressResponse.scoreSummary.inReview || 0;
        const productivityInProgress = dailyProgressResponse.scoreSummary.inProgress || 0;
        const productivityToDo = dailyProgressResponse.scoreSummary.toDo || 0;
        const ftarYes = dailyProgressResponse.qualitySummary.approved || 0;

        this.productivityChart.push({ xKey: this.approved, yKey: productivityApproved.toFixed(2) });
        this.productivityChart.push({ xKey: this.inReview, yKey: productivityInReview.toFixed(2) });
        this.productivityChart.push({ xKey: this.inProgress, yKey: productivityInProgress.toFixed(2) });
        this.productivityChart.push({ xKey: this.toDo, yKey: productivityToDo.toFixed(2) });

        this.qualityChart.push({ title: `${this.ftarYes} ${Math.round(ftarYes * 100)}%`, value: ftarYes.toFixed(2) });
        this.qualityChart.push({ title: `${this.ftarNo} ${Math.round((1 - ftarYes) * 100)}%`, value: (1 - ftarYes).toFixed(2) });
        this.loaded = true;

        this.toasterService.popSuccess(`Welcome Back ${this.profile.name}!`);
    }, () => this.toasterService.popError('Something went wrong'));
  }

  public onDailyProgressDisplayChange(text: string): void {
    this.currentProductivityDisplay = text;
  }

  private calculateDaysCompleted(): void {
    const daysBetween = differenceInDays(new Date(), parse(this.profile.startDate));
    this.daysCompleted = daysBetween - 2 * Math.floor((daysBetween + 2) / 7);
  }
}
