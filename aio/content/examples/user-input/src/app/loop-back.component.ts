// #docregion
import { Component } from '@angular-classic/core';
// #docregion loop-back-component
@Component({
  selector: 'app-loop-back',
  template: `
    <input #box (keyup)="0">
    <p>{{box.value}}</p>
  `
})
export class LoopbackComponent { }
// #enddocregion loop-back-component
