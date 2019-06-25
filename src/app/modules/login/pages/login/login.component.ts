import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { DfToasterService } from '@devfactory/ngx-df';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  public constructor(
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly toasterService: DfToasterService
  ) { }

  public ngOnInit(): void {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 40,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess.bind(this),
      'onfailure': this.onFailure.bind(this)
    });
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
        this.ngZone.run(() => this.router.navigate(['/'])).then();
      }, () => this.toasterService.popError('Something went wrong')
    );
  }
}
