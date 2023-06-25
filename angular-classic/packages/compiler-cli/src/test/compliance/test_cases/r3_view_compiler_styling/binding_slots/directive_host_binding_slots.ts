import {Directive, HostBinding} from '@angular-classic/core';

@Directive({selector: '[myWidthDir]'})
export class WidthDirective {
  @HostBinding('style.width') myWidth = 200;

  @HostBinding('class.foo') myFooClass = true;

  @HostBinding('id') id = 'some id';

  @HostBinding('title') title = 'some title';
}
