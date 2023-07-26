import { readJson, Tree, writeJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import updateAngularCli, { angularCliVersion } from './update-angular-cli';

describe('update-angular-cli migration', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
  });

  it('should update @angular-classic/cli version when defined as a dev dependency', async () => {
    writeJson(tree, 'package.json', {
      devDependencies: { '@angular-classic/cli': '~13.3.0' },
    });

    await updateAngularCli(tree);

    const { devDependencies } = readJson(tree, 'package.json');
    expect(devDependencies['@angular-classic/cli']).toBe(angularCliVersion);
  });

  it('should update @angular-classic/cli version when defined as a dependency', async () => {
    writeJson(tree, 'package.json', {
      dependencies: { '@angular-classic/cli': '~13.3.0' },
    });

    await updateAngularCli(tree);

    const { dependencies } = readJson(tree, 'package.json');
    expect(dependencies['@angular-classic/cli']).toBe(angularCliVersion);
  });

  it('should not add @angular-classic/cli to package.json when it is not set', async () => {
    const initialPackageJson = readJson(tree, 'package.json');

    await updateAngularCli(tree);

    const packageJson = readJson(tree, 'package.json');
    expect(packageJson).toStrictEqual(initialPackageJson);
  });
});
