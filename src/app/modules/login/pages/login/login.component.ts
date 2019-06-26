import { Component, OnInit, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { DfToasterService, DfModalService } from '@devfactory/ngx-df';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  @ViewChild('impersonationModal')
  public impersonationModal: TemplateRef<any>;

  public impersonationEmail: string;

  public constructor(
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly toasterService: DfToasterService,
    public readonly modal: DfModalService
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
    const email = 'poojan.trivedi@aurea.com';
    this.authenticationService.login(googleToken)
    // .pipe(flatMap((sessionToken: string) => {
    //   localStorage.setItem('sessionToken', sessionToken);
    //   return this.authenticationService.impersonate(email);
    // }))
    .subscribe(
      sessionToken => {
        localStorage.setItem('sessionToken', sessionToken);
        const user = this.parseJwt(sessionToken);
        const role = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if (role && role.toLowerCase() === 'admin') {
          this.modal.open(this.impersonationModal, { backdrop: false });
        } else {
          this.ngZone.run(() => this.router.navigate(['/'])).then();
        }
      }, () => this.toasterService.popError('Something went wrong')
    );
  }

  public submitImpersonation(close: Function): void {
    this.authenticationService.impersonate(this.impersonationEmail.trim()).subscribe(sessionToken => {
      localStorage.setItem('sessionToken', sessionToken);
      this.ngZone.run(() => this.router.navigate(['/'])).then();
      close();
    });
  }

  public updateImpersonationEmail(event: any): void {
    this.impersonationEmail = event.target.value;
  }

  private parseJwt (token): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}
