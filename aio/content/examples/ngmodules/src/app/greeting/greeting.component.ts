import { Component } from '@angular-classic/core';
import { UserService } from '../greeting/user.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
})
export class GreetingComponent {
  title = 'NgModules';
  user = '';

  constructor(userService: UserService) {
    this.user = userService.userName;
  }
}
