import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { AuthenticationTokenService } from './authentication-token.service';
import { environment } from 'src/environments/environment';

describe('AuthenticationService', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    let httpClient: jasmine.SpyObj<HttpClient>;
    let service: AuthenticationService;
    let authenticationTokenService: jasmine.SpyObj<AuthenticationTokenService>;

    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['post']);
        authenticationTokenService = jasmine.createSpyObj('AuthenticationTokenService', ['saveToken']);
        TestBed.configureTestingModule({
            providers: [
                { provide: AuthenticationTokenService, useValue: authenticationTokenService },
                AuthenticationService,
                { provide: HttpClient, useValue: httpClient }
            ],
        });
        service = TestBed.get(AuthenticationService);
    });

    it('should be created', () => {
        // Assert
        expect(service).toBeTruthy();
    });

    describe('renewToken', () => {
        it('should call httpClient.post using correct Url', () => {
            // Arrange
            const expectedUrl = `${environment.apiUrl}/AuthenticationJwt`;
            httpClient.post.and.returnValue(of(token));

            // Act
            service.renewToken();

            // Assert
            expect(httpClient.post).toHaveBeenCalledWith(expectedUrl, null);
        });

        it('should call httpClient.post and store returned token', () => {
            // Arrange
            httpClient.post.and.returnValue(of(token));

            // Act
            service.renewToken().subscribe();

            // Assert
            expect(authenticationTokenService.saveToken).toHaveBeenCalledWith(token);
        });
    });
});
