// #docplaster
// #docregion
import { inject } from '@angular-classic/core';
import { Router, NavigationExtras } from '@angular-classic/router';
import { AuthService } from './auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  // Create a dummy session id
  const sessionId = 123456789;

  // Set our navigation extras object
  // that contains our global query params and fragment
  const navigationExtras: NavigationExtras = {
    queryParams: { session_id: sessionId },
    fragment: 'anchor'
  };

  // Redirect to the login page with extras
  return router.createUrlTree(['/login'], navigationExtras);
};

