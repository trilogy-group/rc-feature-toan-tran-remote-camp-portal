import { Component, OnInit, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { DfToasterService } from '@devfactory/ngx-df/toaster';
import { DfModalService } from '@devfactory/ngx-df/modal';
import { FormControl } from '@angular/forms';
import { DfLoadingSpinnerService } from '@devfactory/ngx-df/loading-spinner';
import { finalize } from 'rxjs/operators';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly admin = 'admin';
  // tslint:disable-next-line:max-line-length
  private readonly emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  @ViewChild('impersonationModal')
  public impersonationModal: TemplateRef<any>;

  public impersonationEmailControl = new FormControl();

  public constructor(
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly modal: DfModalService,
    private readonly toasterService: DfToasterService,
    private readonly loadingSpinner: DfLoadingSpinnerService,
  ) { }

  public ngOnInit(): void {
    setTimeout(() => {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess.bind(this),
        'onfailure': this.onFailure.bind(this)
      });
    }, 500);
  }

  public onSuccess(googleUser: any): void {
    this.login(googleUser.getAuthResponse().id_token);
  }

  public onFailure(error: any): void {
    console.log(error);
  }

  public login(googleToken: string): void {
    this.ngZone.run(() => {
      this.authenticationService.login(googleToken)
      .pipe(finalize(() => this.loadingSpinner.hide()))
      .subscribe(
        sessionToken => {
          localStorage.setItem('sessionToken', sessionToken);
          const user = this.parseJwt(sessionToken);
          const role = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          if (role && role.toLowerCase() === this.admin) {
            this.modal.open(this.impersonationModal, { backdrop: true });
          } else {
            this.router.navigate(['/']);
          }
        },
        error => this.handleError(error)
      );
    });
  }

  public isButtonDisabled(): boolean {
    return !this.emailRegex.test(this.impersonationEmailControl.value);
  }

  public submitImpersonation(close: Function): void {
    this.authenticationService.impersonate(this.impersonationEmailControl.value.trim())
    .pipe(finalize(() => this.loadingSpinner.hide()))
    .subscribe(sessionToken => {
      localStorage.setItem('sessionToken', sessionToken);
      this.ngZone.run(() => this.router.navigate(['/'])).then();
      close();
    }, error => this.handleError(error));
  }

  private parseJwt (token): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  private handleError(error): void {
    this.toasterService.popError(error && error.message ? error.message : 'Something went wrong');
  }
}
