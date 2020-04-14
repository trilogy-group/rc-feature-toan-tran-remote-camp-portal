import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {environment} from 'src/environments/environment';

declare var gapi: any;

@Component({
    selector: 'app-sign-in-button',
    templateUrl: './sign-in-button.component.html',
    styleUrls: ['./sign-in-button.component.scss']
})
export class SignInButtonComponent implements OnInit {
    public signedIn = false;

    @Output()
    public loginSucceeded = new EventEmitter<string>();

    @Output()
    public loginFailed = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
        const self = this;
        gapi.load('auth2', function () {
            const auth2 = gapi.auth2.init({
                client_id: environment.googleClientId,
                cookiepolicy: 'single_host_origin',
            });

            auth2.currentUser.listen(self.onGoogleUserChanged.bind(self));

            auth2.attachClickHandler(
                document.getElementById('googleSignInButton'),
                {},
                function () {
                },
                self.onLoginFailed.bind(self));
        });
    }

    public onGoogleUserChanged(googleUser) {
        const idToken = googleUser.getAuthResponse().id_token;
        this.signedIn = !!idToken;
        if (!!idToken) {
            this.loginSucceeded.emit(idToken);
        }
    }

    public onLoginFailed(error) {
        this.loginFailed.emit(error);
    }
}
