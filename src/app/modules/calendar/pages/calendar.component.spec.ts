import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {instance, mock} from 'ts-mockito';
import {of} from 'rxjs';


import {CalendarComponent} from 'src/app/modules/calendar/pages/calendar.component';
import {CalendarService} from 'src/app/shared/services/calendar.service';
import {NgxDfCustom} from 'src/app/shared/ngx-custom.module';

describe('CalendarComponent', () => {
    let component: CalendarComponent;
    let fixture: ComponentFixture<CalendarComponent>;
    let calendarService: CalendarService;

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
                }
            ],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;
        calendarService = TestBed.get(CalendarService);
    });

    it('should be created', () => {
        // Assert
        expect(component).toBeDefined();
    });

    it('should set weekIndexOffset = 1 if there are not more than 4 weeks', () => {
        // Arrange
        const weeks = [
            {header: 'week 1'},
            {header: 'week 2'},
            {header: 'week 3'},
            {header: 'week 4'},
        ];
        spyOn(calendarService, 'getWeeklyPlanning').and.returnValue(of(weeks));

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

        // Act
        component.ngOnInit();

        // Assert
        expect(component.weekIndexOffset).toBe(0);
    });

});
