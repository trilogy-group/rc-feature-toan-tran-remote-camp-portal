import { instance, mock } from 'ts-mockito';
import { Router } from '@angular/router';

import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationTokenService } from '../services/authentication-token.service';

describe('AuthenticationGuard', () => {
  let authenticationGuard: AuthenticationGuard;
  let router: Router;
  let authenticationTokenService: AuthenticationTokenService;

  beforeEach(() => {
    router = instance(mock(Router));
    authenticationTokenService = instance(mock(AuthenticationTokenService));
    authenticationGuard = new AuthenticationGuard(router, authenticationTokenService);
  });

  describe('isAdminRoute', () => {
    it('should return "admin" as admin route', () => {
      // Arrange
      const route = 'admin';

      // Act
      const adminRoute = authenticationGuard['isAdminRoute'](route);

      // Assert
      expect(adminRoute).toBe(true);
    });

    it('should return "rca" as not-admin route', () => {
      // Arrange
      const route = 'rca';

      // Act
      const adminRoute = authenticationGuard['isAdminRoute'](route);

      // Assert
      expect(adminRoute).toBe(false);
    });
  });

  describe('isAdminRoute', () => {
    it('should return "admin as non-user route', () => {
      // Arrange
      const route = 'admin';

      // Act
      const userRoute = authenticationGuard['isUserRoute'](route);

      // Assert
      expect(userRoute).toBe(false);
    });

    it('should return "rca" as user route', () => {
      // Arrange
      const route = 'rca';

      // Act
      const userRoute = authenticationGuard['isUserRoute'](route);

      // Assert
      expect(userRoute).toBe(true);
    });
  });
});
