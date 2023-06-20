import {ReleaseConfig} from '@angular-classic/ng-dev';

/** Configuration for the `ng-dev release` command. */
export const release: ReleaseConfig = {
  publishRegistry: 'https://wombat-dressing-room.appspot.com',
  representativeNpmPackage: '@angular-classic/core',
  npmPackages: [
    {name: '@angular-classic/animations'},
    {name: '@angular-classic/common'},
    {name: '@angular-classic/compiler'},
    {name: '@angular-classic/compiler-cli'},
    {name: '@angular-classic/core'},
    {name: '@angular-classic/elements'},
    {name: '@angular-classic/forms'},
    {name: '@angular-classic/language-service'},
    {name: '@angular-classic/localize'},
    {name: '@angular-classic/platform-browser'},
    {name: '@angular-classic/platform-browser-dynamic'},
    {name: '@angular-classic/platform-server'},
    {name: '@angular-classic/router'},
    {name: '@angular-classic/service-worker'},
    {name: '@angular-classic/upgrade'},
  ],
  buildPackages: async () => {
    // The buildTargetPackages function is loaded at runtime as the loading the script
    // causes an invocation of Bazel.
    const {performNpmReleaseBuild} = await import('../scripts/build/package-builder.mjs');
    return performNpmReleaseBuild();
  },
  releaseNotes: {
    hiddenScopes: ['aio', 'bazel', 'dev-infra', 'docs-infra', 'zone.js', 'devtools'],
  },
  releasePrLabels: ['area: build & ci', 'action: merge', 'PullApprove: disable'],
};
