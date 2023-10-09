import type { GeneratorCallback, Tree } from '@nx/devkit';
import { addDependenciesToPackageJson } from '@nx/devkit';
import { versions } from '../../utils/version-utils';

export function addAngularEsLintDependencies(tree: Tree): GeneratorCallback {
  const angularEslintVersionToInstall = versions(tree).angularEslintVersion;
  return addDependenciesToPackageJson(
    tree,
    {},
    {
      '@angular-classic-eslint/eslint-plugin': angularEslintVersionToInstall,
      '@angular-classic-eslint/eslint-plugin-template': angularEslintVersionToInstall,
      '@angular-classic-eslint/template-parser': angularEslintVersionToInstall,
    }
  );
}
