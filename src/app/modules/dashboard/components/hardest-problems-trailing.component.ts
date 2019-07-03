import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hardest-problems-trailing',
  templateUrl: './hardest-problems-trailing.component.html',
  styleUrls: ['./hardest-problems-trailing.component.scss']
})
export class HardestProblemsTrailingComponent implements OnInit {
  private workweekLength = 5;

  @Input()
  public hardestProblemsByDay: any[];

  public week1: any[] = [];

  public week2: any[] = [];

  public week3: any[] = [];

  public week4: any[] = [];

  public ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      this[`week${i + 1}`] = this.hardestProblemsByDay.slice(i * this.workweekLength, (i + 1) * this.workweekLength);
      while (this[`week${i + 1}`].length !== 0 && this[`week${i + 1}`].length !== this.workweekLength) {
        this[`week${i + 1}`].push({ });
      }
    }
  }
}
