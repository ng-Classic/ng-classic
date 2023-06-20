import {Directive} from '@angular-classic/core';

@Directive({
  host: {
    '(click)': 'c(this.$event)',
  }
})
class Dir {
  $event = {};
  c(value: {}) {}
}
