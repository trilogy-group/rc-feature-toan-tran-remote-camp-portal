import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  public constructor(
    private _authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder
  ) {

    this.form = _formBuilder.group({
      username: _formBuilder.control('', [Validators.required]),
      password: _formBuilder.control('', [Validators.required])
    });
  }

  public ngOnInit(): void {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 40,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }

  public onSuccess(googleUser: any): void {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }

  public onFailure(error: any): void {
    console.log(error);
  }

  public login(): void {
    this._authenticationService.login(this.form.value);
  }
}
