import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DfAccordion, DfAccordionPanel } from '@devfactory/ngx-df';
import { instance, mock } from 'ts-mockito';

import { WeeklyCalendarComponent } from 'src/app/modules/calendar/components/weekly-calendar/weekly-calendar.component';
import { NgxDfCustom } from 'src/app/shared/ngx-custom.module';
import { UtilsService } from 'src/app/shared/services/utils.service';

describe('WeeklyCalendarComponent', () => {
    let component: WeeklyCalendarComponent;
    let fixture: ComponentFixture<WeeklyCalendarComponent>;
    let utilsServiceStub: UtilsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [WeeklyCalendarComponent],
            imports: [
                NgxDfCustom,
            ],
            providers: [
                {
                  provide: UtilsService,
                  useValue: instance(mock(UtilsService))
                }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WeeklyCalendarComponent);
        component = fixture.componentInstance;
        utilsServiceStub = TestBed.get(UtilsService);
    });

    it('should be created', () => {
        // Assert
        expect(component).toBeDefined();
    });

    it('should set weekIndexOffset = 0 if there are more than 4 weeks', () => {
        // Arrange
        component.weekPlanning = {
            week: [
                {
                    day: 'Monday',
                    description: 'day description 1',
                    actions: [
                        {
                            duration: 1,
                            position: 0
                        },
                        {
                            duration: 2,
                            position: 1
                        }
                    ]
                }
            ]
        };

        // Act
        component.ngOnInit();

        // Assert
        expect(component.weekPlanning.week[0].actions.length).toBe(3);
        expect(component.weekPlanning.week[0].actions[2]).toEqual({
            description: 'Total',
            position: Number.MAX_SAFE_INTEGER,
            duration: 3
        });
    });

    describe('ngAfterViewInit', () => {
        it('should open accordion panels when the week is current week', () => {
            // Arrange
            const index = 1;
            utilsServiceStub.getCurrentWeek = jasmine.createSpy().and.returnValue(index);
            component.index = index;
            const accordionPanelStub = { openPanel: jasmine.createSpy().and.returnValue({}) };
            component.weekAccordion = instance(mock(DfAccordion));
            component.weekAccordion.panels = [accordionPanelStub as unknown as DfAccordionPanel];


            // Act
            component.ngAfterViewInit();

            // Assert
            expect(accordionPanelStub.openPanel).toHaveBeenCalled();
        });
    });

    describe('closeAccordion', () => {
        it('should close panels', () => {
            // Arrange
            const accordionPanelStub = { closePanel: jasmine.createSpy().and.returnValue({}) };
            component.weekAccordion = instance(mock(DfAccordion));
            component.weekAccordion.panels = [accordionPanelStub as unknown as DfAccordionPanel];

            // Act
            component.closeAccordion();

            // Assert
            expect(accordionPanelStub.closePanel).toHaveBeenCalled();
        });
    });

});
