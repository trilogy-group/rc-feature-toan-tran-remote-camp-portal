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
      const weekProblems = this.hardestProblemsByDay.slice(i * this.workweekLength, (i + 1) * this.workweekLength);
      weekProblems.forEach(day => {
          day.items.sort((itemA, itemB) => {
            if (!!itemA.resolved === !!itemB.resolved) {
              return 0;
            }

            if (!itemA.resolved && itemB.resolved) {
              return -1;
            }

            return 1;
          });
          let goodDay = day.items
            .map(items => items.resolved)
            .reduce((resolvedA, resolvedB) => goodDay = goodDay && !!resolvedA && !!resolvedB, true);
          day.goodDay = goodDay;
        }
      );
      this[`week${i + 1}`] = weekProblems;
      while (this[`week${i + 1}`].length !== 0 && this[`week${i + 1}`].length !== this.workweekLength) {
        this[`week${i + 1}`].push({ });
      }
    }
  }
}
