import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DfHttpSkipInterceptorEnum } from '@devfactory/ngx-df/interceptor';

import { RegistrationService } from './registration.service';
import { of } from 'rxjs';

describe('RegistrationService', () => {
    let httpClient: jasmine.SpyObj<HttpClient>;
    let service: RegistrationService;

    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['get']);
        httpClient.get.and.returnValue(of({}));
        TestBed.configureTestingModule({
            providers: [RegistrationService, { provide: HttpClient, useValue: httpClient }],
        });
        service = TestBed.get(RegistrationService);
    });

    it('should be created', () => {
        // Assert
        expect(service).toBeTruthy();
    });

    describe('doesGitHubUsernameExist', () => {
        it('should call httpClient.get using correct Url', () => {
            // Arrange
            const expectedUrl = 'https://api.github.com/users/';
            const username = 'username';
            const options = { headers: {} };
            options['headers'][DfHttpSkipInterceptorEnum.LoaderInterceptor] = '';

            // Act
            service.doesGitHubUsernameExist(username);

            // Assert
            expect(httpClient.get).toHaveBeenCalledWith(`${expectedUrl}${username}`, options);
        });
    });
});
