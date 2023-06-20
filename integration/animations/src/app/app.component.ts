import {Component} from '@angular-classic/core';
import {animate, style, transition, trigger} from '@angular-classic/animations';

@Component({
  selector: 'app-animations',
  template: `
    <div [@myAnimation]="exp"></div>
    `,
  animations:
      [trigger('myAnimation', [transition('* => on', [animate(1000, style({opacity: 1}))])])]
})
export class AnimationsComponent {
  exp: any = false;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
}