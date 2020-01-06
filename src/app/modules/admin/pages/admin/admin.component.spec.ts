import { ComponentFixture, TestBed, tick, fakeAsync, flushMicrotasks, discardPeriodicTasks } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DfToasterService } from '@devfactory/ngx-df/toaster';
import { instance, mock } from 'ts-mockito';
import { throwError, of } from 'rxjs';


import { AdminComponent } from 'src/app/modules/admin/pages/admin/admin.component';
import { AdminService } from 'src/app/shared/services/admin.service';
import { NgxDfCustom } from 'src/app/shared/ngx-custom.module';

describe('AdminComponnet', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let adminService: AdminService;
  let toasterService: DfToasterService;
  const data = {
    'executionArn': '123456'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AdminComponent],
      imports: [
        NgxDfCustom,
      ],
      providers: [
        {
          provide: AdminService,
          useValue: instance(mock(AdminService)),
        },
        {
          provide: DfToasterService,
          useValue: instance(mock(DfToasterService)),
        },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    adminService = TestBed.get(AdminService);
    toasterService = TestBed.get(DfToasterService);
  });

  it('should be created', () => {
    // Assert
    expect(component).toBeDefined();
  });

  describe('refresh Knowledge Base', () => {
    it('should refresh knowledge base', fakeAsync(() => {
      // Arrange
      spyOn(adminService, 'refreshKnowledgeBase').and.returnValue(of(data));
      spyOn(adminService, 'getRefreshKnowledgeBaseStatus').and.returnValue(of({ 'status': 'SUCCEEDED'}));
      spyOn(toasterService, 'popSuccess').and.returnValue(null);

      // Act
      component.refreshKnowledgeBase();
      tick(component.waitTime);
      discardPeriodicTasks();
      fixture.detectChanges();

      // Assert
      expect(toasterService.popSuccess).toHaveBeenCalledWith('Knowledge base refreshed successfully');
    }));

    it('show pop error message - refreshKnowledgeBase', () => {
      // Arrange
      spyOn(adminService, 'refreshKnowledgeBase').and.returnValue(throwError({}));
      spyOn(toasterService, 'popError').and.returnValue(null);

      // Act
      component.refreshKnowledgeBase();

      // Assert
      expect(toasterService.popError).toHaveBeenCalledWith('Something went wrong');
    });

    it('show pop error message - getRefreshKnowledgeBaseStatus', () => {
      // Arrange
      spyOn(adminService, 'refreshKnowledgeBase').and.returnValue(of(data));
      spyOn(adminService, 'getRefreshKnowledgeBaseStatus').and.returnValue(throwError({}));
      spyOn(toasterService, 'popError').and.returnValue(null);

      // Act
      component.refreshKnowledgeBase();

      // Assert
      expect(toasterService.popError).toHaveBeenCalledWith('Something went wrong');
    });

    it('show pop error message - reached max retries', fakeAsync(() => {
      // Arrange
      spyOn(adminService, 'refreshKnowledgeBase').and.returnValue(of(data));
      spyOn(adminService, 'getRefreshKnowledgeBaseStatus').and.returnValue(of({ 'status': 'RUNNING' }));
      spyOn(toasterService, 'popWarning').and.returnValue(null);

      // Act
      component.refreshKnowledgeBase();
      tick(component.waitTime * component.maxRetries);
      discardPeriodicTasks();
      fixture.detectChanges();

      // Assert
      expect(toasterService.popWarning).toHaveBeenCalledWith('Exceeded number of retries');
    }));

    it('show pop error message - execution status "failed"', fakeAsync(() => {
      // Arrange
      spyOn(adminService, 'refreshKnowledgeBase').and.returnValue(of(data));
      spyOn(adminService, 'getRefreshKnowledgeBaseStatus').and.returnValue(of({ 'status': 'FAILED' }));
      spyOn(toasterService, 'popError').and.returnValue(null);

      // Act
      component.refreshKnowledgeBase();
      tick(component.waitTime);
      discardPeriodicTasks();
      fixture.detectChanges();

      // Assert
      expect(toasterService.popError).toHaveBeenCalledWith('Something went wrong');
    }));
  });
});
