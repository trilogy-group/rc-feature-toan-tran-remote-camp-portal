import { OnInit, Component } from '@angular/core';
import { DfToasterService } from '@devfactory/ngx-df/toaster';

import { GradebookService } from 'src/app/shared/services/gradebook.service';
import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.scss']
})
export class GradebookComponent implements OnInit {
  public gradebookData: any[];
  public lastRefreshed: Date;
  public loaded = false;

  constructor(
    private readonly gradebookService: GradebookService,
    private readonly toasterService: DfToasterService,
    private readonly authenticationTokenService: AuthenticationTokenService
  ) { }

  public ngOnInit(): void {
    this.gradebookService.getGradebookData(this.authenticationTokenService.isUserAdmin())
      .subscribe(gradebookData => {
      const showWelcome = localStorage.getItem('showWelcomeMessage') === 'true';
      localStorage.removeItem('showWelcomeMessage');
      this.gradebookData = gradebookData.gradeBook;
      this.lastRefreshed = new Date(gradebookData.currentDateTimeStamp);
      this.loaded = true;

      if (showWelcome) {
        this.toasterService.popSuccess(`Welcome Back!`);
      }
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
      return icRow.scoreSummary.approved >= icRow.scoreSummary.targetForToday ?
      'above-average' : 'below-average';
    }

    return '';
  }

  public getScoreAnchorColor(icRow: any, combined: boolean): string {
    if (icRow.scoreSummary && icRow.scoreSummary.approved != null) {
      return icRow.scoreSummary.approved >= icRow.scoreSummary.targetForToday ?
      'above-average-anchor' : 'below-average-anchor';
    }

    return '';
  }

  public isAdmin(): boolean {
    return this.authenticationTokenService.isUserAdmin();
  }

  public getCombinedScoreColor(icRow: any): string {
    if (icRow.scoreSummary && icRow.scoreSummary.approved != null && icRow.scoreSummary.inReview != null) {
      return icRow.scoreSummary.approved + icRow.scoreSummary.inReview >= icRow.scoreSummary.targetForToday ?
      'above-average' : 'below-average';
    }

    return '';
  }

  public getCombinedScoreAnchorColor(icRow: any): string {
    if (icRow.scoreSummary && icRow.scoreSummary.approved != null && icRow.scoreSummary.inReview != null) {
      return icRow.scoreSummary.approved + icRow.scoreSummary.inReview >= icRow.scoreSummary.targetForToday ?
      'above-average-anchor' : 'below-average-anchor';
    }

    return '';
  }

  public getTargetScoreColor(icRow: any): string {
    if (icRow.scoreSummary.approved >= icRow.scoreSummary.targetForToday) {
      return 'above-average';
    }

    if (icRow.scoreSummary.approved + icRow.scoreSummary.inReview < icRow.scoreSummary.targetForToday) {
      return 'below-average';
    }

    if (icRow.scoreSummary.approved + icRow.scoreSummary.inReview >= icRow.scoreSummary.targetForToday) {
      return 'matches-average';
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

  public getQualityAnchorColor(icRow: any): string {
    if (icRow.qualitySummary && icRow.qualitySummary.approved != null) {
      return icRow.qualitySummary.approved >= icRow.qualitySummary.targetForToday ?
      'above-average-anchor' : 'below-average-anchor';
    }

    return '';
  }

  public getCombinedQualityColor(icRow: any): string {
    if (icRow.qualitySummary && icRow.qualitySummary.approved != null && icRow.qualitySummary.inReview != null) {
      return icRow.qualitySummary.approved + icRow.qualitySummary.inReview >= icRow.qualitySummary.targetForToday ?
      'above-average' : 'below-average';
    }

    return '';
  }

  public getCombinedQualityAnchorColor(icRow: any): string {
    if (icRow.qualitySummary && icRow.qualitySummary.approved != null && icRow.qualitySummary.inReview != null) {
      return icRow.qualitySummary.approved + icRow.qualitySummary.inReview >= icRow.qualitySummary.targetForToday ?
      'above-average-anchor' : 'below-average-anchor';
    }

    return '';
  }

  public getTargetQualityColor(icRow: any): string {
    if (icRow.qualitySummary.approved >= icRow.qualitySummary.targetForToday) {
      return 'above-average';
    }

    if (icRow.qualitySummary.approved + icRow.qualitySummary.inReview < icRow.qualitySummary.targetForToday) {
      return 'below-average';
    }

    if (icRow.qualitySummary.approved + icRow.qualitySummary.inReview >= icRow.qualitySummary.targetForToday) {
      return 'matches-average';
    }
    return '';
  }

}
