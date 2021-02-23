import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { DfToasterService } from '@devfactory/ngx-df/toaster';
import { of } from 'rxjs';

import { SharedModule } from 'src/app/shared/shared.module';
import { RcaComponent } from './rca.component';
import { RcaService } from '../../../../shared/services/rca.service';
import { RcaItem } from '../../../../shared/model/rca-item';
import { RcaStatus } from '../../../../shared/model/rca-status';

describe('RcaComponent', () => {
  let component: RcaComponent;
  let fixture: ComponentFixture<RcaComponent>;
  let mockRcaService: jasmine.SpyObj<RcaService>;
  let mockToasterService: jasmine.SpyObj<DfToasterService>;
  const mockData: RcaItem[] = [{
    ticket: 'REM-385318',
    ticketLink: 'https://crossover.atlassian.net/browse/REM-385318',
    ticketSummary: 'Create a UI prototype for RCA Page',
    riqb: 'IQB-2',
    riqbLink: 'https://crossover.atlassian.net/browse/RIQB-1290',
    riqbSummary: 'Pull-Request title should have Jira Issue Key, for instance, "REM-1 <summary>"',
    dayNumber: 2,
    storyOfIncident: 'Story of Incident ...',
    rootCause: 'Root cause',
    correctiveAction: 'correct action',
    status: RcaStatus.Resolved
  }];

  beforeEach(async(() => {
    mockRcaService = jasmine.createSpyObj('RcaService', ['getRcaData']);
    mockToasterService = jasmine.createSpyObj('DfToasterService', ['popSuccess']);
    TestBed.configureTestingModule({
      declarations: [RcaComponent],
      imports: [
        SharedModule,
        MatTooltipModule,
        MatIconModule
      ],
      providers: [
        { provide: RcaService, useValue: mockRcaService },
        { provide: DfToasterService, useValue: mockToasterService }
      ]
    })
      .compileComponents();

    mockRcaService.getRcaData.and.returnValue(of(mockData));
    fixture = TestBed.createComponent(RcaComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    // Act
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should set loaded flag to false at start', () => {
      // Assert
      expect(component.isLoaded).toEqual(false);
    });

    it('should call rca service to load data and display welcome message if user start at this page', () => {
      // Arrange
      localStorage.setItem('showWelcomeMessage', 'true');

      // Act
      component.ngOnInit();

      // Assert
      expect(mockRcaService.getRcaData).toHaveBeenCalledTimes(1);
      expect(component.isLoaded).toEqual(true);
      expect(component.rcaData).toEqual(mockData);
      expect(mockToasterService.popSuccess).toHaveBeenCalledWith('Welcome Back!');
      expect(localStorage.getItem('showWelcomeMessage')).toBeNull();
    });

    it('should call rca service to load data and not display welcome message if user not start at this page', () => {
      // Arrange
      localStorage.removeItem('showWelcomeMessage');

      // Act
      component.ngOnInit();

      // Assert
      expect(mockRcaService.getRcaData).toHaveBeenCalledTimes(1);
      expect(component.isLoaded).toEqual(true);
      expect(component.rcaData).toEqual(mockData);
      expect(mockToasterService.popSuccess).toHaveBeenCalledTimes(0);
    });
  });
});
