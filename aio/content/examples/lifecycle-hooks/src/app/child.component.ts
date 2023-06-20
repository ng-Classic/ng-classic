import { Component } from '@angular-classic/core';

@Component({
  selector: 'app-child',
  template: `<label for="hero-name">Hero name: </label>
  <input type="text" id="hero-name" [(ngModel)]="hero">`
})
export class ChildComponent {
  hero = 'Magneta';
}
