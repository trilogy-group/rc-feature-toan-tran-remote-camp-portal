import { of, throwError } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import {instance, mock} from 'ts-mockito';

import {RegistrationService} from 'src/app/shared/services/registration.service';
import { GitHubValidator } from './github.validator';

describe('GitHubValidator', () => {
    let registrationService: RegistrationService;

    beforeEach(() => {
        registrationService = instance(mock(RegistrationService));
    });

    it('should validate GitHub username when registrationService.doesGitHubUsernameExist returns successfully', () => {
      // Arrange
      const control = {} as AbstractControl;
      registrationService.doesGitHubUsernameExist = jasmine.createSpy().and.returnValue(of({}));

      // Act and assert
      GitHubValidator.createValidator(registrationService)(control)
      .subscribe(response => expect(response).toEqual(null));
    });

    it('should validate GitHub username when registrationService.doesGitHubUsernameExist throws an error', () => {
      // Arrange
      const control = {} as AbstractControl;
      registrationService.doesGitHubUsernameExist = jasmine.createSpy()
        .and.returnValue(throwError({ error: status }));

      // Act and assert
      GitHubValidator.createValidator(registrationService)(control)
      .subscribe(response => expect(response).toEqual(null));
    });
});
