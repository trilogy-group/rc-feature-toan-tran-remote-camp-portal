import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

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

  public login(): void {
    this._authenticationService.login(this.form.value);
  }
}
