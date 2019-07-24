import { OnInit, Component } from '@angular/core';

import { GradebookService } from 'src/app/shared/services/gradebook.service';

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.scss']
})
export class GradebookComponent implements OnInit {
  public gradebookData: any[];
  public loaded = false;

  constructor(
    private gradebookService: GradebookService,
  ) { }

  public ngOnInit(): void {
    this.gradebookService.getGradebookData().subscribe(gradebookData => {
      this.gradebookData = gradebookData;
      this.loaded = true;
    });
  }

  public getApprovedPlusInReviewScore(icRow: any): number {
    let combined = 0;
    if (icRow.scoreSummary) {
      combined = icRow.scoreSummary.approved || 0;
      combined += icRow.scoreSummary.inReview || 0;
    }
    return combined;
  }

  public getScoreColor(icRow: any, combined: boolean): string {
    if (icRow.scoreSummary && icRow.scoreSummary.approved != null) {
      if (!combined) {
        return icRow.scoreSummary.approved >= icRow.scoreSummary.targetForToday ?
        'above-average' : 'below-average';
      } else if (icRow.scoreSummary.inReview != null) {
        return icRow.scoreSummary.approved + icRow.scoreSummary.inReview >= icRow.scoreSummary.targetForToday ?
        'above-average' : 'below-average';
      }
    }

    return '';
  }

  public getQualityColor(icRow: any): string {
    if (icRow.qualitySummary && icRow.qualitySummary.approved != null) {
      return icRow.qualitySummary.approved >= icRow.qualitySummary.targetForToday ?
        'above-average' : 'below-average';
    }

    return '';
  }

}
