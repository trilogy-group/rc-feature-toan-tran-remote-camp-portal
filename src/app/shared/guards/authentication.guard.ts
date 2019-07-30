import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  public constructor(
    private _router: Router,
    private _authenticationTokenService: AuthenticationTokenService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (route.url.toString().startsWith(`${environment.apiUrl}/gradebook`)) {
      return this._authenticationTokenService.isUserAdmin();
    }
    if (this._authenticationTokenService.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['login']);
    }

    return false;
  }
}
