import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DfHttpSkipInterceptorEnum } from '@devfactory/ngx-df/interceptor';

import { OnboardingService } from './onboarding.service';

describe('OnboardingService', () => {
    let httpClient: jasmine.SpyObj<HttpClient>;
    let service: OnboardingService;

    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [OnboardingService, { provide: HttpClient, useValue: httpClient }],
        });
        service = TestBed.get(OnboardingService);
    });

    it('should be created', () => {
        // Assert
        expect(service).toBeTruthy();
    });

    describe('getCommunicationChannelAccess', () => {
        it('should call httpClient.get using correct Url', () => {
            // Arrange
            const expectedUrl = 'https://hmart2ms7g.execute-api.us-east-1.amazonaws.com/dev/check-xoChat-registeration-get';
            const email = 'test@test.com';
            const options = { headers: {} };
            options['headers'][DfHttpSkipInterceptorEnum.LoaderInterceptor] = '';

            // Act
            service.getCommunicationChannelAccess(email);

            // Assert
            expect(httpClient.get).toHaveBeenCalledWith(`${expectedUrl}?email=${email}`, options);
        });
    });
});
