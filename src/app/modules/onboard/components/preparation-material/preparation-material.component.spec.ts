import { PreparationMaterialComponent } from './preparation-material.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { instance, mock } from 'ts-mockito';
import { of, forkJoin } from 'rxjs';

import { TrainingMaterialService } from 'src/app/shared/services/training-material.service';
import { NgxDfCustom } from 'src/app/shared/ngx-custom.module';
import { TrainingMaterial } from 'src/app/modules/onboard/models/training-material.model';

describe('PreparationMaterialComponent', () => {
  let component: PreparationMaterialComponent;
  let fixture: ComponentFixture<PreparationMaterialComponent>;
  let trainingMaterialService: TrainingMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PreparationMaterialComponent],
      imports: [
        NgxDfCustom,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: TrainingMaterialService,
          useValue: instance(mock(TrainingMaterialService)),
        }
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationMaterialComponent);
    component = fixture.componentInstance;
    trainingMaterialService = TestBed.get(TrainingMaterialService);
    forkJoin().subscribe = jasmine.createSpy().and.callThrough();
  });

  it('should be created', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    // Arrange
    spyOn(trainingMaterialService, 'fetchWorksmartTrainings').and.returnValue(of());
    spyOn(trainingMaterialService, 'fetchTechnicalTrainings').and.returnValue(of());

    // Act
    component.ngOnInit();

    // Assert
    expect(forkJoin().subscribe).toHaveBeenCalled();
  });

  describe('assignTrainings', () => {
    it('should set worksmart trainings', async () => {
      // Arrange
      const worksmartTrainings: TrainingMaterial[] = [{
        name: 'worksmart training',
        trainingUrl: 'url',
        type: 'video',
        duration: '2',
        focus: 'productivity'
      }];

      // Act
      component.assignTrainings([worksmartTrainings, {}]);

      // Assert
      expect(component.worksmartTrainings[0].name).toBe('worksmart training');
    });

    it('should set technical trainings', () => {
      // Arrange
      const technicalTrainings: TrainingMaterial[] = [{
        name: 'technical training',
        trainingUrl: 'url',
        type: 'video',
        duration: '2',
        focus: 'productivity'
      }];

      // Act
      component.assignTrainings([{}, technicalTrainings]);

      // Assert
      expect(component.technicalTrainings[0].name).toBe('technical training');
    });
  });
});
