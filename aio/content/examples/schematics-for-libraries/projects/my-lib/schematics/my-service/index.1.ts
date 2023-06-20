import { Rule, Tree } from '@angular-classic-devkit/schematics';

import { Schema as MyServiceSchema } from './schema';

// #docregion factory
export function myService(options: MyServiceSchema): Rule {
  return (tree: Tree) => tree;
}
// #enddocregion factory
