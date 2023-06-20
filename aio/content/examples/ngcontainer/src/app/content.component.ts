import { Component } from '@angular-classic/core';

@Component({
  selector: 'content-comp',
  template:
    `<div>
      <ng-content></ng-content>
    </div>`,
  styles: [ `
    div { border: medium dashed green; padding: 1em; width: 150px; text-align: center}
  `]
})
export class ContentComponent { }
