import { AbstractControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';

import { RegistrationService } from '../services/registration.service';
import { of } from 'rxjs';

export class GitHubValidator {
  static createValidator(registrationService: RegistrationService) {
    return (control: AbstractControl) => registrationService.doesGitHubUsernameExist(control.value).pipe(
      map(res => null),
      catchError((error) =>
        of(error.status === 404 ? { userNotExists: 'Username does not exist. Please enter an existing one' } : null)
      )
    );
  }
}
