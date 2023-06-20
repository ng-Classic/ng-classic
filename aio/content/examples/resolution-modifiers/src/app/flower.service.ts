import { Injectable } from '@angular-classic/core';

@Injectable({
  providedIn: 'root' // provide this service in the root ModuleInjector

})
export class FlowerService {
  emoji = '🌸';
}
