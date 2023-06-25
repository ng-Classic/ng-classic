import {Pipe} from '@angular-classic/core';

@Pipe({
  standalone: true,
  name: 'stpipe',
})
export class StandalonePipe {
  transform(value: any): any {}
}
