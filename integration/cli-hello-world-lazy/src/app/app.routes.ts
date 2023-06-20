import {Routes} from '@angular-classic/router';


export const appRoutes: Routes = [{
  path: 'lazy',
  loadChildren: () => import('./lazy/lazy.routes').then(routes => routes.lazyRoutes),
}];
