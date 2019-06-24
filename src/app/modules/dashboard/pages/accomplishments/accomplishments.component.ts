import { OnInit, Component } from '@angular/core';
import { AccomplishmentsService } from 'src/app/shared/services/accomplishments.service';
import { forkJoin } from 'rxjs';
import { DF_COLORS, DfLineChartConfiguration, DfLineChartScaleType } from '@devfactory/ngx-df';

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

  public icName: string;
  public dateStarted: string;
  public daysCompleted: string;
  public pipeline: string;
  public deckUrl: string;
  public tmsUrl: string;
  public profile: any = { };

  constructor(private readonly accomplishmentsService: AccomplishmentsService) {}

  public ngOnInit(): void {
    this.dailyProgressChartOptions.xAxisScale = DfLineChartScaleType.Linear;
    this.dailyProgressChartOptions.showDots = true;

    forkJoin(
      this.accomplishmentsService.getScoreSummary(''),
      this.accomplishmentsService.getFtarSummary(''),
      this.accomplishmentsService.getProfile()
    ).subscribe(([score, ftar, profile]) => {
      this.accomplishmentsSummary.push({
        stat: this.FTAR,
        values: ftar.weekly.map(qualityScore => qualityScore * 100),
        average: ftar.average * 100
      });
      this.accomplishmentsSummary.push({
        stat: this.score,
        values: score.weekly,
        average: score.average
      });
      this.profile = profile;
    });

    this.accomplishmentsService.getAcomplishmentsDailyProgress('')
      .subscribe(dailyProgressResponse => {
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
        ).reverse();

        this.dailyProgressChart = this.dailyProgress.reverse().map(dailyObject => {
          return {
            xKey: `Day ${dailyObject.day.toString()}`,
            productivity: dailyObject.productivity,
            quality: dailyObject.quality ?  dailyObject.quality / 100 : 1
          };
        });
        const productivityApproved = dailyProgressResponse.scoreSummary.approved;
        const productivityInReview = dailyProgressResponse.scoreSummary.inReview;
        const productivityInProgress = dailyProgressResponse.scoreSummary.inProgress;
        const productivityToDo = dailyProgressResponse.scoreSummary.toDo;
        const ftarYes = dailyProgressResponse.qualitySummary.approved;

        this.productivityChart.push({ xKey: this.approved, yKey: productivityApproved });
        this.productivityChart.push({ xKey: this.inReview, yKey: productivityInReview });
        this.productivityChart.push({ xKey: this.inProgress, yKey: productivityInProgress });
        this.productivityChart.push({ xKey: this.toDo, yKey: productivityToDo });

        this.qualityChart.push({ title: `${this.ftarYes} ${Math.round(ftarYes * 100)}%`, value: ftarYes });
        this.qualityChart.push({ title: `${this.ftarNo} ${Math.round((1 - ftarYes) * 100)}%`, value: 1 - ftarYes });
      });

    this.accomplishmentsService.getHardestProblems(this.icName).subscribe(hardestProblems => this.hardestProblems = hardestProblems);
  }

  public onDailyProgressDisplayChange(text: string): void {
    this.currentProductivityDisplay = text;
  }
}
