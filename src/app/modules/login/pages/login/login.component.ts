import { Component, OnInit, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DfToasterService } from '@devfactory/ngx-df/toaster';
import { FormControl } from '@angular/forms';
import { DfLoadingSpinnerService } from '@devfactory/ngx-df/loading-spinner';
import { DfModalService } from '@devfactory/ngx-df/modal';
import { finalize } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';

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
    private readonly authenticationTokenService: AuthenticationTokenService
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
    this.toasterService.popError('Something went wrong. Coud not login to Google');
    console.log(error);
  }

  public login(googleToken: string): void {
    this.ngZone.run(() => {
      this.authenticationService.login(googleToken)
      .pipe(finalize(() => this.loadingSpinner.hide()))
      .subscribe(
        () => {
          const role = this.authenticationTokenService.getUserRole();
          if (role && role.toLowerCase() === this.admin) {
            this.modal.open(this.impersonationModal, { backdrop: true });
          } else {
            this.navigateToHomePage();
          }
        },
        error => this.handleError(error)
      );
    });
  }

  public isButtonDisabled(): boolean {
    return !this.emailRegex.test(this.impersonationEmailControl.value);
  }

  public navigateToHomePage(): any {
    localStorage.setItem('showWelcomeMessage', 'true');
    if (this.authenticationTokenService.isUserAdmin()) {
      return this.router.navigate(['/gradebook']);
    }
    return this.router.navigate(['']);
  }

  public submitImpersonation(close: Function): void {
    this.authenticationService.impersonate(this.impersonationEmailControl.value.trim())
    .pipe(finalize(() => this.loadingSpinner.hide()))
    .subscribe(() => {
      this.ngZone.run(() => this.navigateToHomePage()).then();
      close();
    }, error => {
      this.handleError(error);
      if (error.status === 401 || error.status === 403) {
        close();
      }
    });
  }

  public skipImpersonation(close: Function): void {
    this.ngZone.run(() => this.navigateToHomePage()).then(close);
  }

  private handleError(error): void {
    let errorMessage = 'Something went wrong';
    if (error && error.error) {
      errorMessage = error.error;
    } else if (error.status === 401) {
      errorMessage = 'Session Expired';
    } else if (error && error.message) {
      errorMessage = error.message;
    }

    this.toasterService.popError(errorMessage);
  }
}
