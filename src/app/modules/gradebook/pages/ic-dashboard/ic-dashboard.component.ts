import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ic-dashboard',
  templateUrl: './ic-dashboard.component.html',
  styleUrls: ['./ic-dashboard.component.scss']
})
export class IcDashboardComponent {
  public icName: string;

  constructor(private route: ActivatedRoute) {
    this.icName = this.route.snapshot.queryParams['icName'];
  }
}
