import { OnInit, Component } from '@angular/core';
import { AccomplishmentsService } from 'src/app/shared/services/accomplishments.service';
import { forkJoin } from 'rxjs';
import { differenceInDays, parse, isSaturday, isSunday } from 'date-fns';
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
    { text: '', id: 0, icon: 'fa fa-line-chart' },
    { text: '', id: 1, icon: 'fa fa-th' },
  ];

  public readonly qualityColors = [
    DF_COLORS.GREEN,
    DF_COLORS.RED,
  ];
  public readonly productivityColors = [
    DF_COLORS.GREEN,
    DF_COLORS.YELLOW,
    DF_COLORS.BLUE
  ];
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

  public daysCompleted: number;
  public profile: any = { };
  public weeks = [0, 1, 2, 3];
  public showWelcome: boolean;

  constructor(
    private readonly accomplishmentsService: AccomplishmentsService,
    private readonly toasterService: DfToasterService,
    private readonly loadingSpinner: DfLoadingSpinnerService,
  ) {}

  public ngOnInit(): void {
    this.dailyProgressChartOptions.xAxisScale = DfLineChartScaleType.Linear;
    this.dailyProgressChartOptions.showDots = true;
    this.showWelcome = localStorage.getItem('showWelcomeMessage') === 'true';
    localStorage.removeItem('showWelcomeMessage');
    forkJoin(
      this.accomplishmentsService.getHardestProblems(),
      this.accomplishmentsService.getProfile(),
      this.accomplishmentsService.getAcomplishmentsDailyProgress(),
      this.accomplishmentsService.getHardestProblemsByDay()
    )
    .pipe(finalize(() => this.loadingSpinner.hide()))
    .subscribe(([hardestProblems, profile, dailyProgressResponse, hardestProblemsByDay]) => {
      this.hardestProblems = hardestProblems;
      this.profile = profile;
      this.calculateDaysCompleted();

      const weeklyQuality = dailyProgressResponse.weekly.map(week => week.quality != null ? week.quality * 100 : null);
      const weeklyProductivity = dailyProgressResponse.weekly.map(week => week.productivity ? week.productivity : 0);

      this.accomplishmentsSummary.push({
        stat: this.FTAR,
        values: weeklyQuality,
        average: this.getWeightedFtarAverage(weeklyQuality, weeklyProductivity)
      });

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
          quality: dailyObject.quality ? (dailyObject.quality / 100).toFixed(2) : 1
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

      this.loaded = true;

      if (this.showWelcome) {
        this.toasterService.popSuccess(`Welcome Back ${this.profile.name}!`);
      }
    }, () => this.toasterService.popError('Something went wrong'));
  }

  public onDailyProgressDisplayChange(text: string): void {
    this.currentProductivityDisplay = text;
  }

  private calculateDaysCompleted(): void {
    const now = new Date();
    const daysBetween = differenceInDays(new Date(), parse(this.profile.startDate));
    if (isSaturday(now)) {
      this.daysCompleted = daysBetween - 2 * Math.floor(daysBetween / 7);
    } else if (isSunday(now)) {
      this.daysCompleted = daysBetween - 2 * Math.floor((daysBetween + 2) / 7) + 1;
    } else {
      this.daysCompleted = daysBetween - 2 * Math.floor((daysBetween + 2) / 7);
    }
  }

  private getWeightedFtarAverage(weeklyQuality: number[], weeklyProductivity: number[]): number {
    let ftarAvg = 0;

    const totalProductivity = weeklyProductivity.reduce((a, b) => (a + b), 0);
    weeklyProductivity.forEach((weekProductivity, index) => {
      let weekQuality = weeklyQuality[index];
      if (weekQuality == null) {
        weekQuality = 100;
        weeklyQuality[index] = weekQuality;
      }
      ftarAvg += weekProductivity * weekQuality / totalProductivity;
    });

    return ftarAvg;
  }
}
