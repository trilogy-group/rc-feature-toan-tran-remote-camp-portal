import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { instance, mock } from 'ts-mockito';
import { DfPortalOrientation, DfToasterService, DfPortalService } from '@devfactory/ngx-df';

import { NgxDfCustom } from 'src/app/shared/ngx-custom.module';
import { OnboardStatusComponent } from './onboard-status.component';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { OnboardingService } from 'src/app/shared/services/onboarding.service';
import {UtilsService} from '../../../../shared/services/utils.service';

describe('OnboardStatusComponent', () => {
  let component: OnboardStatusComponent;
  let fixture: ComponentFixture<OnboardStatusComponent>;
  let portalService: DfPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OnboardStatusComponent],
      imports: [
        NgxDfCustom,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: ProfileService,
          useValue: instance(mock(ProfileService)),
        },
        {
          provide: OnboardingService,
          useValue: instance(mock(OnboardingService))
        },
        {
          provide: DfToasterService,
          useValue: instance(mock(DfToasterService)),
        },
        {
          provide: DfPortalService,
          useValue: instance(mock(DfPortalService)),
        },
        {
          provide: UtilsService,
          useValue: instance(mock(UtilsService)),
        },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardStatusComponent);
    component = fixture.componentInstance;

    portalService = TestBed.get(DfPortalService);
  });

  it('should be created', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should set portal options', () => {
    // Assert
    expect(component['portalOptions'].showCloseButton).toBe(true);
    expect(component['portalOptions'].orientation).toBe(DfPortalOrientation.Right);
    expect(component['portalOptions'].width).toBe('600px');
  });

  describe('openTrainingMaterials', () => {
    it('should call the open method', () => {
      // Arrange
      spyOn(portalService, 'open').and.returnValue({});

      // Act
      component.openTrainingMaterials();

      // Assert
      expect(portalService.open).toHaveBeenCalled();
    });
  });
});
