import { Component } from '@angular/core';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  public constructor(
    private _authenticationService: AuthenticationService
  ) {}

  public logout(): void {
    this._authenticationService.logout();
  }
}
