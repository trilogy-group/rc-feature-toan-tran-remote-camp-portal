import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  public constructor(
    private ngZone: NgZone,
    private router: Router,
    private authenticationService: AuthenticationService,
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
    setTimeout(() => this.login(googleUser.getAuthResponse().id_token));
  }

  public onFailure(error: any): void {
    console.log(error);
  }

  public login(googleToken: string): void {
    this.authenticationService.login(googleToken).subscribe(
      sessionToken => {
        localStorage.setItem('sessionToken', sessionToken);
        this.ngZone.run(() => this.router.navigate(['/'])).then();
      }, () => { }
    );
  }
}
