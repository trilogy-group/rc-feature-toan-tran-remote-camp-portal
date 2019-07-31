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
    const isUserAdmin = this._authenticationTokenService.isUserAdmin();
    const isLoggedIn = this._authenticationTokenService.isLoggedIn();

    if (!isLoggedIn) {
      this._router.navigate(['/login']);
      return false;
    }

    if (isLoggedIn && !route.firstChild) {
      isUserAdmin ? this._router.navigate(['/gradebook']) : this._router.navigate(['/dashboard']);
    }

    if (isLoggedIn && route.firstChild) {
      const url = route.firstChild.url ? route.firstChild.url[0].path : '';
      if (url === '') {
        this._router.navigate(['/']);
        return false;
      }

      if (isUserAdmin && url !== '') {
        if (this.isAdminRoute(url)) {
          return true;
        } else {
          this._router.navigate(['/']);
          return false;
        }
      }

      if (this.isUserRoute(url)) {
        return true;
      } else {
        this._router.navigate(['/']);
        return false;
      }
    }
    return false;
  }

  private isAdminRoute(url: string): boolean {
    return url === 'gradebook';
  }

  private isUserRoute(url: string): boolean {
    return url !== 'gradebook';
  }
}
