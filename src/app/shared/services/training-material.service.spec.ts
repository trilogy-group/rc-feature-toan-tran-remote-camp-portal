import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TrainingMaterialService } from './training-material.service';

describe('TrainingMaterialService', () => {
  let httpClient: jasmine.SpyObj<HttpClient>;
  let service: TrainingMaterialService;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [TrainingMaterialService, { provide: HttpClient, useValue: httpClient }],
    });
    service = TestBed.get(TrainingMaterialService);
  });

  it('should be created', () => {
    // Assert
    expect(service).toBeTruthy();
  });

  describe('fetchWorksmartTrainings', () => {
    it('should call httpClient.get using correct Url', () => {
      // Arrange
      const expectedUrl = 'https://nqgh2fcnx5.execute-api.us-east-1.amazonaws.com/dev/ws-pro';

      // Act
      service.fetchWorksmartTrainings();

      // Assert
      expect(httpClient.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  describe('fetchTechnicalTrainings', () => {
    it('should call httpClient.get using correct Url', () => {
      // Arrange
      const expectedUrl = 'https://nqgh2fcnx5.execute-api.us-east-1.amazonaws.com/dev/technical';
      const pipelineId = '1';

      // Act
      service.fetchTechnicalTrainings(pipelineId);

      // Assert
      expect(httpClient.get).toHaveBeenCalledWith(`${expectedUrl}?pipeline-jira-id=${pipelineId}`);
    });
  });
});
