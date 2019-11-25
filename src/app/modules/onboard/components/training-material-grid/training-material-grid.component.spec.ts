import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { instance, mock } from 'ts-mockito';

import { TrainingMaterialService } from 'src/app/shared/services/training-material.service';
import { NgxDfCustom } from 'src/app/shared/ngx-custom.module';
import { TrainingMaterialGridComponent } from './training-material-grid.component';

describe('TrainingMaterialGridComponent', () => {
  let component: TrainingMaterialGridComponent;
  let fixture: ComponentFixture<TrainingMaterialGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TrainingMaterialGridComponent],
      imports: [
        NgxDfCustom,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: TrainingMaterialService,
          useValue: instance(mock(TrainingMaterialService)),
        },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingMaterialGridComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    // Assert
    expect(component).toBeTruthy();
  });
});
