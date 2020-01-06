import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DfHttpSkipInterceptorEnum } from '@devfactory/ngx-df/interceptor';

import { AdminService } from './admin.service';

describe('AdminService', () => {
    let httpClient: jasmine.SpyObj<HttpClient>;
    let service: AdminService;
    const options = { headers: {} };
    options['headers'][DfHttpSkipInterceptorEnum.LoaderInterceptor] = '';

    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['post']);
        TestBed.configureTestingModule({
            providers: [AdminService, { provide: HttpClient, useValue: httpClient }],
        });
        service = TestBed.get(AdminService);
    });

    it('should be created', () => {
        // Assert
        expect(service).toBeTruthy();
    });

    describe('refreshKB', () => {
        it('should call httpClient.post using correct Url', () => {
            // Arrange
            const expectedUrl = 'https://3ont4uqzx2.execute-api.us-east-1.amazonaws.com/dev/refresh-kb';

            // Act
            service.refreshKnowledgeBase();

            // Assert
            expect(httpClient.post).toHaveBeenCalledWith(expectedUrl, {}, options);
        });
    });

    describe('getRefreshKnowledgeBaseStatus', () => {
        it('should call httpClient.post using correct Url', () => {
            // Arrange
            const expectedUrl = 'https://3ont4uqzx2.execute-api.us-east-1.amazonaws.com/dev/status';
            const executionArn = '123456';
            // Act
            service.getRefreshKnowledgeBaseStatus(executionArn);

            // Assert
            expect(httpClient.post).toHaveBeenCalledWith(expectedUrl, { executionArn}, options);
        });
    });
});
