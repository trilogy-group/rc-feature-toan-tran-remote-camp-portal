import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly icPreStartHome = '/onboard';
  private readonly icHome = '/dashboard';

  public constructor(
    private _router: Router,
    private _authenticationTokenService: AuthenticationTokenService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isUserAdmin = this._authenticationTokenService.isUserAdmin();
    const isLoggedIn = this._authenticationTokenService.isLoggedIn();

    if (route.firstChild ) {
      const url = route.firstChild.url ? route.firstChild.url[0].path : '';
      if (url === 'registration') {
        return true;
      }
    }

    if (!isLoggedIn) {
      this._router.navigate(['/login']);
      return false;
    }

    if (isLoggedIn && !route.firstChild) {
      const icHome = this._authenticationTokenService.hasICStarted() ? this.icHome : this.icPreStartHome;
      isUserAdmin ? this._router.navigate(['/gradebook']) : this._router.navigate([icHome]);
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
    return url === 'gradebook' || url === 'admin';
  }

  private isUserRoute(url: string): boolean {
    return url !== 'admin';
  }
}
