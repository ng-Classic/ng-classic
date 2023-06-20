import {CommitMessageConfig} from '@angular-classic/ng-dev';

/**
 * The configuration for `ng-dev commit-message` commands.
 */
export const commitMessage: CommitMessageConfig = {
  maxLineLength: Infinity,
  minBodyLength: 20,
  minBodyLengthTypeExcludes: ['docs'],
  scopes: [
    'animations',
    'bazel',
    'benchpress',
    'changelog',
    'common',
    'compiler',
    'compiler-cli',
    'core',
    'dev-infra',
    'devtools',
    'docs-infra',
    'elements',
    'forms',
    'http',
    'language-service',
    'localize',
    'migrations',
    'packaging',
    'platform-browser',
    'platform-browser-dynamic',
    'platform-server',
    'router',
    'service-worker',
    'upgrade',
    've',
    'zone.js',
  ],
};
