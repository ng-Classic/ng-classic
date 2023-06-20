import {Directive} from '@angular-classic/core';

@Directive({host: {'(click)': 'c($event)'}})
class Dir {
  c(event: any) {}
}
