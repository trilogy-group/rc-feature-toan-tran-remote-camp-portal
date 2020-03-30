import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, QueryList } from '@angular/core';
import { instance, mock } from 'ts-mockito';
import { of } from 'rxjs';


import { CalendarComponent } from 'src/app/modules/calendar/pages/calendar.component';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { NgxDfCustom } from 'src/app/shared/ngx-custom.module';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { WeeklyCalendarComponent } from '../components/weekly-calendar/weekly-calendar.component';

describe('CalendarComponent', () => {
    let component: CalendarComponent;
    let fixture: ComponentFixture<CalendarComponent>;
    let calendarService: CalendarService;
    let profileServiceStub: ProfileService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [CalendarComponent],
            imports: [
                NgxDfCustom,
            ],
            providers: [
                {
                    provide: CalendarService,
                    useValue: instance(mock(CalendarService)),
                },
                {
                    provide: ProfileService,
                    useValue: instance(mock(ProfileService))
                }
            ],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;
        calendarService = TestBed.get(CalendarService);
        profileServiceStub = TestBed.get(ProfileService);
    });

    it('should be created', () => {
        // Assert
        expect(component).toBeDefined();
    });

    describe('ngOnInit', () => {
        it('should set weekIndexOffset = 1 if there are not more than 4 weeks', () => {
            // Arrange
            const weeks = [
                {header: 'week 1'},
                {header: 'week 2'},
                {header: 'week 3'},
                {header: 'week 4'},
            ];
            spyOn(calendarService, 'getWeeklyPlanning').and.returnValue(of(weeks));
            spyOn(profileServiceStub, 'getProfile').and.returnValue(of({ startDate: '' }));

            // Act
            component.ngOnInit();

            // Assert
            expect(component.weekIndexOffset).toBe(1);
        });

        it('should set weekIndexOffset = 0 if there are more than 4 weeks', () => {
            // Arrange
            const weeks = [
                {header: 'week 0'},
                {header: 'week 1'},
                {header: 'week 2'},
                {header: 'week 3'},
                {header: 'week 4'}
            ];
            spyOn(calendarService, 'getWeeklyPlanning').and.returnValue(of(weeks));
            spyOn(profileServiceStub, 'getProfile').and.returnValue(of({ startDate: '' }));

            // Act
            component.ngOnInit();

            // Assert
            expect(component.weekIndexOffset).toBe(0);
        });


        it('should set startDate', () => {
            // Arrange
            const startDate = '2010-10-10';
            const weeks = [
            ];
            spyOn(calendarService, 'getWeeklyPlanning').and.returnValue(of(weeks));
            spyOn(profileServiceStub, 'getProfile').and.returnValue(of({ startDate: startDate }));

            // Act
            component.ngOnInit();

            // Assert
            expect(component.startDate).toBe(startDate);
        });
    });

    describe('closeOtherAccordions', () => {
        it('should call closeAccordion for all other weeks', () => {
            // Arrange
            const calendarComponentStub1 = instance(mock(WeeklyCalendarComponent));
            calendarComponentStub1.closeAccordion = jasmine.createSpy().and.returnValue(null);
            const calendarComponentStub2 = instance(mock(WeeklyCalendarComponent));
            calendarComponentStub2.closeAccordion = jasmine.createSpy().and.returnValue(null);
            component.weeks = [calendarComponentStub1, calendarComponentStub2] as unknown as QueryList<WeeklyCalendarComponent>;

            // Act
            component.closeOtherAccordions(1);

            // Assert
            expect(calendarComponentStub1.closeAccordion).not.toHaveBeenCalled();
            expect(calendarComponentStub2.closeAccordion).toHaveBeenCalled();
        });
    });
});
