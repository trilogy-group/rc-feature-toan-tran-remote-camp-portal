import {SignInButtonComponent} from './sign-in-button.component';
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {NgxDfCustom} from 'src/app/shared/ngx-custom.module';

describe('SignInButtonComponent', () => {
    let component: SignInButtonComponent;
    let fixture: ComponentFixture<SignInButtonComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [SignInButtonComponent],
            imports: [
                NgxDfCustom,
                BrowserAnimationsModule
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInButtonComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        // Assert
        expect(component).toBeTruthy();
    });

    it('should subscribe on gapi', () => {
        // Arrange
        spyOn(component, 'onGoogleUserChanged');
        spyOn(component, 'onLoginFailed');
        const auth2 = {
            currentUser: {
                listen: (callback) => {
                    callback();
                }
            },
            attachClickHandler: (element, options, onSuccessCallback, onFailedCallback) => {
                onFailedCallback();
            }
        };

        let gapiInitOptions;
        window['gapi'] = {
            auth2: {
                init: (options) => {
                    gapiInitOptions = options;
                    return auth2;
                }
            },

            load: (item, callback) => {
                callback();
            }
        };

        // Act
        component.ngOnInit();

        // Assert
        expect(gapiInitOptions).toEqual({
            client_id: '833875804511-7quv82va3lpm63b1ap0ob0c5sjjms8nq.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin'
        });
        expect(component.onGoogleUserChanged).toHaveBeenCalled();
        expect(component.onLoginFailed).toHaveBeenCalled();
    });

    it('should emit loginSucceeded', () => {
        // Arrange
        spyOn(component.loginSucceeded, 'emit');

        const googleToken = 'token1';
        const googleUser = {
            getAuthResponse: () => {
                return {id_token: googleToken};
            }
        };

        // Act
        component.onGoogleUserChanged(googleUser);

        // Assert
        expect(component.loginSucceeded.emit).toHaveBeenCalledWith(googleToken);
    });

    it('should emit loginFailed', () => {
        // Arrange
        spyOn(component.loginFailed, 'emit');

        const error = 'error1';

        // Act
        component.onLoginFailed(error);

        // Assert
        expect(component.loginFailed.emit).toHaveBeenCalledWith(error);
    });
});
