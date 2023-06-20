import { Injectable } from '@angular-classic/core';

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService {
  getAuthorizationToken() {
    return 'some-auth-token';
  }
}
