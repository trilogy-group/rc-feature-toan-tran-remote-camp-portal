import { Component, ViewChild } from '@angular/core';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DfSidebar } from '@devfactory/ngx-df/sidebar';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  @ViewChild('sideBar')
  private sideBar: DfSidebar;

  public constructor(
    private _authenticationService: AuthenticationService
  ) {}

  public logout(): void {
    this._authenticationService.logout();
  }

  public toggleSideBar(): void {
    this.sideBar.toogleOpen();
  }
}
