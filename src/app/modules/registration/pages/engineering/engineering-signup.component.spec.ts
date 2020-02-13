import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {instance, mock} from 'ts-mockito';
import {Router} from '@angular/router';

import {SharedModule} from 'src/app/shared/shared.module';

import {FormBuilder} from '@angular/forms';
import {RegistrationService} from 'src/app/shared/services/registration.service';
import {DfToasterService} from '@devfactory/ngx-df/toaster';
import {EngineeringSignupComponent} from './engineering-signup.component';
import {of} from 'rxjs';
import {addDays} from 'date-fns';
import {DF_ERROR_STATE_MATCHER} from '@devfactory/ngx-df';

describe('EngineeringSignupComponent', () => {
    let component: EngineeringSignupComponent;
    let fixture: ComponentFixture<EngineeringSignupComponent>;
    let registrationService: RegistrationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [EngineeringSignupComponent],
            imports: [
                SharedModule
            ],
            providers: [
                {
                    provide: DfToasterService,
                    useValue: instance(mock(DfToasterService)),
                },
                {
                    provide: RegistrationService,
                    useValue: instance(mock(RegistrationService))
                },
                {
                    provide: FormBuilder,
                    useValue: instance(mock(FormBuilder)),
                },
                {
                    provide: Router,
                    useValue: instance(mock(Router)),
                },
                {
                    provide: DF_ERROR_STATE_MATCHER,
                    useValue: instance(mock(DF_ERROR_STATE_MATCHER))
                }
            ],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EngineeringSignupComponent);
        component = fixture.componentInstance;
        registrationService = TestBed.get(RegistrationService);
    });

    afterAll(() => {
        jasmine.clock().uninstall();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set minimum start date', () => {
        // Arrange
        jasmine.clock().install();
        const now = new Date();

        jasmine.clock().mockDate(now);
        spyOn(registrationService, 'getAvailableRoles').and.returnValue(of([]));

        // Act
        component.ngOnInit();

        // Assert
        expect(component.minStartDate.getTime()).toBeGreaterThanOrEqual(addDays(now, 15).getTime());
    });


    it('should set roles', () => {
        // Arrange
        const roles = [
            {
                name: 'role2'
            },
            {
                name: 'role1'
            }];
        spyOn(registrationService, 'getAvailableRoles').and.returnValue(of(roles));

        // Act
        component.ngOnInit();

        // Assert
        expect(component.loaded).toBeTruthy();
        expect(component.roles.length).toBe(2);
    });
});
