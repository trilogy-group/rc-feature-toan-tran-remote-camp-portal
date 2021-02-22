import { TestBed } from '@angular/core/testing';

import { RcaService } from './rca.service';

describe('RcaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RcaService
    ]
  }));

  it('should be created', () => {
    // Act
    const service: RcaService = TestBed.get(RcaService);

    // Assert
    expect(service).toBeTruthy();
  });
});
