import { Component, OnInit } from '@angular/core';
import { DfToasterService } from '@devfactory/ngx-df/toaster';

import { RcaService } from '../../../../shared/services/rca.service';
import { RcaItem } from '../../../../shared/model/rca-item';

@Component({
  selector: 'app-rca',
  templateUrl: './rca.component.html',
  styleUrls: ['./rca.component.scss']
})
export class RcaComponent implements OnInit {
  private readonly showWelcomeMessageFlag = 'showWelcomeMessage';
  private readonly showWelcomeMessageFlagTrueValue = 'true';
  private readonly welcomeMessage = 'Welcome Back!';

  public rcaData: RcaItem[];
  public isLoaded = false;

  constructor(private readonly rcaService: RcaService,
              private readonly toasterService: DfToasterService) {}

  ngOnInit() {
    this.rcaService.getRcaData().subscribe(
      (data) => {
        this.rcaData = data;
        this.isLoaded = true;

        const showWelcomeFlag = localStorage.getItem(this.showWelcomeMessageFlag);
        const needShowWelcomeMessage = showWelcomeFlag === this.showWelcomeMessageFlagTrueValue;
        localStorage.removeItem(this.showWelcomeMessageFlag);
        if (needShowWelcomeMessage) {
          this.toasterService.popSuccess(this.welcomeMessage);
        }
      }
    );
  }
}
