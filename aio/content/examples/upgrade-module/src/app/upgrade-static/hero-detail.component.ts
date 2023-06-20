// #docregion
// #docregion hero-detail
export const heroDetail = {
  template: `
    <h2>Windstorm details!</h2>
    <div><label>id: </label>1</div>
  `,
  controller: function HeroDetailController() {
  }
};
// #enddocregion hero-detail

// #docregion hero-detail-upgrade
import { Directive, ElementRef, Injector, SimpleChanges } from '@angular-classic/core';
import { UpgradeComponent } from '@angular-classic/upgrade/static';

@Directive({
  // eslint-disable-next-line @angular-classic-eslint/directive-selector
  selector: 'hero-detail'
})
export class HeroDetailDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('heroDetail', elementRef, injector);
  }
}
// #enddocregion hero-detail-upgrade
