import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {instance, mock} from 'ts-mockito';
import {Router} from '@angular/router';

import {SharedModule} from 'src/app/shared/shared.module';

import {FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import {RegistrationService} from 'src/app/shared/services/registration.service';
import {DfToasterService} from '@devfactory/ngx-df/toaster';
import {EngineeringSignupComponent} from './engineering-signup.component';
import {of} from 'rxjs';
import {addDays} from 'date-fns';
import {DF_ERROR_STATE_MATCHER} from '@devfactory/ngx-df';
import {UtilsService} from '../../../../shared/services/utils.service';

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
                    provide: UtilsService,
                    useValue: instance(mock(UtilsService))
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
        expect(component.minStartDate.getTime()).toBeGreaterThanOrEqual(addDays(now, 7).getTime());
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

    describe(('getGitHubUsernameErrorMessage'), () => {
        it('should get message when name is empty', () => {
            // Arrange
            const formMock = {
                controls: { GitHubId: { value: ''} },
                get: jasmine.createSpy().and.returnValue({ errors: '' })
            };
            component.form = formMock as unknown as FormGroup;

            // Act
            const message = component.getGitHubUsernameErrorMessage();

            // Assert
            expect(message).toEqual(component['fieldRequiredMessage']);
        });

        it('should get message when name is invalid', () => {
            // Arrange
            const invalidName = 'invalid name';
            const formMock = {
                controls: { GitHubId: { value: '-invalidusername'} },
                get: jasmine.createSpy().and.returnValue({ errors: { invalidName } })
            };
            component.form = formMock as unknown as FormGroup;

            // Act
            const message = component.getGitHubUsernameErrorMessage();

            // Assert
            expect(message).toEqual(invalidName);
        });

        it('should get message when user is non-existent', () => {
            // Arrange
            const userNotExists = 'user non existent';
            const formMock = {
                controls: { GitHubId: { value: '-invalidusername'} },
                get: jasmine.createSpy().and.returnValue({ errors: { userNotExists } })
            };
            component.form = formMock as unknown as FormGroup;

            // Act
            const message = component.getGitHubUsernameErrorMessage();

            // Assert
            expect(message).toEqual(userNotExists);
        });
    });

    it('should return an object when the GitHub username is incorrect', () => {
        // Arrange
        const control = { value: 'https://github.com' } as AbstractControl;

        // Act
        const validationResult = component.gitHubUsernameValidator(control);

        // Assert
        // tslint:disable-next-line:max-line-length
        const invalidGitHubNameMessage = 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen. Also, it should not be longer than 38 characters';
        expect(validationResult).toEqual({ invalidName: invalidGitHubNameMessage});
    });
});
