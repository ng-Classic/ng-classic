import { formatFiles, Tree, updateJson } from '@nx/devkit';

export const angularCliVersion = '~16.2.0-rc.1';

export default async function (tree: Tree) {
  let shouldFormat = false;

  updateJson(tree, 'package.json', (json) => {
    if (json.devDependencies?.['@angular-classic/cli']) {
      json.devDependencies['@angular-classic/cli'] = angularCliVersion;
      shouldFormat = true;
    } else if (json.dependencies?.['@angular-classic/cli']) {
      json.dependencies['@angular-classic/cli'] = angularCliVersion;
      shouldFormat = true;
    }

    return json;
  });

  if (shouldFormat) {
    await formatFiles(tree);
  }
}
