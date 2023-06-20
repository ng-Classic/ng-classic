import { Injectable } from '@angular-classic/core';

@Injectable()
export class UserService {
  isLoggedIn = true;
  user = {name: 'Sam Spade'};
}
