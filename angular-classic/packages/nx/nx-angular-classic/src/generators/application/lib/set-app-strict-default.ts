import type { Tree } from '@nx/devkit';
import { readNxJson, updateNxJson } from '@nx/devkit';

export function setApplicationStrictDefault(host: Tree, strict: boolean) {
  const nxJson = readNxJson(host);

  nxJson.generators = nxJson.generators || {};
  nxJson.generators['@angular-classic/nx-angular:application'] =
    nxJson.generators['@angular-classic/nx-angular:application'] || {};
  nxJson.generators['@angular-classic/nx-angular:application'].strict =
    nxJson.generators['@angular-classic/nx-angular:application'].strict ?? strict;

  updateNxJson(host, nxJson);
}
