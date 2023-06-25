import {Component} from '@angular-classic/core';

@Component({
  selector: 'test-cmp',
  template: `<button (click)="items.push('item' + items.length)">Add Item</button>`,
})
export class TestCmp {
  items: string[] = [];
}
