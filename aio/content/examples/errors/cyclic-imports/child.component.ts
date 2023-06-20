import { Component } from '@angular-classic/core';
import { ParentComponent } from './parent.component';

@Component({selector: 'app-child', template: 'The child!'})
export class ChildComponent {
  constructor(private parent: ParentComponent) {}
}
