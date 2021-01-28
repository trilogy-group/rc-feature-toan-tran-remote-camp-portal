import {TestBed} from '@angular/core/testing';

import {AuthenticationTokenService} from './authentication-token.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthenticationTokenService', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTM2MTYxNDh9.lqEVVG163AKuXjOwTcJnusdZ-ASiFlfcFA0z693aF3w';
    const tokenExp = 1613616148;
    const TOKEN_KEY_PROPERTY_NAME = 'TOKEN_KEY';
    const TOKEN_REMAINING_TIME_TO_LIVE_FROM_METHOD_NAME = 'getTokenRemainingTimeToLiveFrom';
    let service: AuthenticationTokenService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                AuthenticationTokenService
            ],
        });

        service = TestBed.get(AuthenticationTokenService);
        localStorage.removeItem(service[TOKEN_KEY_PROPERTY_NAME]);
    });

    it('should be created', () => {
        // Assert
        expect(service).toBeTruthy();
    });

    describe(TOKEN_REMAINING_TIME_TO_LIVE_FROM_METHOD_NAME, () => {
        it('should return 0 if token not in local storage', () => {
            // Arrange
            const expectedRemainingTimeToLive = 0;
            const timeStamp = tokenExp - 1;

            // Act
            const timeToLive = service[TOKEN_REMAINING_TIME_TO_LIVE_FROM_METHOD_NAME](timeStamp);

            // Assert
            expect(timeToLive).toEqual(expectedRemainingTimeToLive);
        });

        const parameters = [
            {
                description: 'should return 0 if expiration time before timestamp',
                timeStamp: tokenExp + 1,
                expectedRemainingTimeToLive: 0
            },
            {
                description: 'should return 0 if expiration time equal timestamp',
                timeStamp: tokenExp,
                expectedRemainingTimeToLive: 0
            },
            {
                description: 'should return remain time if expiration time after timestamp',
                timeStamp: tokenExp - 1,
                expectedRemainingTimeToLive: 1
            }
        ];

        parameters.forEach(parameter => {
            it(parameter.description, () => {
                // Arrange
                localStorage.setItem(service[TOKEN_KEY_PROPERTY_NAME], token);

                // Act
                const timeToLive = service[TOKEN_REMAINING_TIME_TO_LIVE_FROM_METHOD_NAME](parameter.timeStamp);

                // Assert
                expect(timeToLive).toEqual(parameter.expectedRemainingTimeToLive);
            });
        });
    });
});
