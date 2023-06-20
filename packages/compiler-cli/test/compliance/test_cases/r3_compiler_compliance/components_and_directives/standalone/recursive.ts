import {Component} from '@angular-classic/core';

@Component({
  standalone: true,
  selector: 'recursive-cmp',
  // Simple recursion. Note: no `imports`.
  template: '<recursive-cmp></recursive-cmp>',
})
export class RecursiveComponent {
}
