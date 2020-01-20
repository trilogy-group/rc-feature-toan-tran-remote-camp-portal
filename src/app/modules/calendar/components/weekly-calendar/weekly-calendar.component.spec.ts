import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {WeeklyCalendarComponent} from 'src/app/modules/calendar/components/weekly-calendar/weekly-calendar.component';
import {NgxDfCustom} from 'src/app/shared/ngx-custom.module';

describe('WeeklyCalendarComponent', () => {
    let component: WeeklyCalendarComponent;
    let fixture: ComponentFixture<WeeklyCalendarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [WeeklyCalendarComponent],
            imports: [
                NgxDfCustom,
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WeeklyCalendarComponent);
        component = fixture.componentInstance;
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

});
