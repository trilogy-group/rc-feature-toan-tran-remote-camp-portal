import { of } from 'rxjs';

import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    const checkIntervalPropertyName = 'tokenRenewCheckIntervalInMs';
    const renewThreshold = 12 * 60 * 60;
    let component: AppComponent;
    let authenticationService: jasmine.SpyObj<AuthenticationService>;
    let authenticationTokenService: jasmine.SpyObj<AuthenticationTokenService>;

    beforeEach(() => {
        authenticationService = jasmine.createSpyObj('AuthenticationService', ['renewToken']);
        authenticationTokenService = jasmine.createSpyObj('AuthenticationTokenService',
            ['isLoggedIn', 'getTokenRemainingTimeToLive']);
        jasmine.clock().install();
        component = new AppComponent(authenticationTokenService, authenticationService);
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    describe('ngOnInit', () => {
        it('should start renew job', () => {
            // Act
            component.ngOnInit();
            jasmine.clock().tick(component[checkIntervalPropertyName]);
            jasmine.clock().tick(component[checkIntervalPropertyName]);

            // Assert
            expect(authenticationTokenService.isLoggedIn).toHaveBeenCalledTimes(2);
        });

        it('should not renew token when not login', () => {
            // Arrange
            authenticationTokenService.isLoggedIn.and.returnValue(false);

            // Act
            component.ngOnInit();
            jasmine.clock().tick(component[checkIntervalPropertyName]);

            // Assert
            expect(authenticationService.renewToken).not.toHaveBeenCalledWith();
        });

        it('should not renew token when token time to live not reach expiration threshold', () => {
            // Arrange
            authenticationTokenService.isLoggedIn.and.returnValue(true);
            authenticationTokenService.getTokenRemainingTimeToLive.and.returnValue(renewThreshold + 1);

            // Act
            component.ngOnInit();
            jasmine.clock().tick(component[checkIntervalPropertyName]);

            // Assert
            expect(authenticationService.renewToken).not.toHaveBeenCalledWith();
        });

        it('should not renew token when token time to live equal expiration threshold', () => {
            // Arrange
            authenticationTokenService.isLoggedIn.and.returnValue(true);
            authenticationTokenService.getTokenRemainingTimeToLive.and.returnValue(renewThreshold);

            // Act
            component.ngOnInit();
            jasmine.clock().tick(component[checkIntervalPropertyName]);

            // Assert
            expect(authenticationService.renewToken).not.toHaveBeenCalledWith();
        });

        it('should renew token when token time to live smaller than expiration threshold', () => {
            // Arrange
            authenticationTokenService.isLoggedIn.and.returnValue(true);
            authenticationTokenService.getTokenRemainingTimeToLive.and.returnValue(renewThreshold - 1);
            authenticationService.renewToken.and.returnValue(of());

            // Act
            component.ngOnInit();
            jasmine.clock().tick(component[checkIntervalPropertyName]);

            // Assert
            expect(authenticationService.renewToken).toHaveBeenCalledTimes(1);
        });
    });
});
