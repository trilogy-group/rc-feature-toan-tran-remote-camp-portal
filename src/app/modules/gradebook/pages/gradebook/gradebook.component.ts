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

  constructor(private gradebookService: GradebookService) { }

  public ngOnInit(): void {
    this.gradebookService.getGradebookData().subscribe(data => {
      this.loaded = true;
      this.gradebookData = data;
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
}
