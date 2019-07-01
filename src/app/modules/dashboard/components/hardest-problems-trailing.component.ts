import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hardest-problems-trailing',
  templateUrl: './hardest-problems-trailing.component.html',
  styleUrls: ['./hardest-problems-trailing.component.scss']
})
export class HardestProblemsTrailingComponent implements OnInit {
  @Input()
  public hardestProblemsByDay: any[];

  public week1: any[] = [];

  public week2: any[] = [];

  public week3: any[] = [];

  public week4: any[] = [];

  public ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      this[`week${i + 1}`] = this.hardestProblemsByDay.slice(i * 7, (i + 1) * 7);
      while (this[`week${i + 1}`].length !== 0 && this[`week${i + 1}`].length !== 7) {
        this[`week${i + 1}`].push({ });
      }
    }
  }
}
