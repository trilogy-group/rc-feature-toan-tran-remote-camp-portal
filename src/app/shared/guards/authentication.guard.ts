import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  public constructor(
    private _router: Router,
    private _authenticationTokenService: AuthenticationTokenService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authenticationTokenService.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['login']);
    }

    return false;
  }
}
