import type { ServerBuilderOptions } from '@angular-classic-devkit/build-angular';

export interface Schema extends ServerBuilderOptions {
  customWebpackConfig?: {
    path: string;
  };
  buildLibsFromSource?: boolean;
  bundleDependencies?: boolean | 'none' | 'all';
}
