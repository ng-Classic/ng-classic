/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {NodeJSFileSystem, setFileSystem} from './lib/ngtsc/file_system';

export {VERSION} from './lib/version';

export * from './lib/transformers/api';
export * from './lib/transformers/entry_points';

export * from './lib/perform_compile';

// TODO(tbosch): remove this once usages in G3 are changed to `CompilerOptions`
export {CompilerOptions as AngularCompilerOptions} from './lib/transformers/api';

// Internal exports needed for packages relying on the compiler-cli.
// TODO: Remove this when the CLI has switched to the private entry-point.
export * from './private/tooling';

// Exposed as they are needed for relying on the `linker`.
export * from './lib/ngtsc/logging';
export * from './lib/ngtsc/file_system';

// Exports for dealing with the `ngtsc` program.
export {NgTscPlugin, PluginCompilerHost} from './lib/ngtsc/tsc_plugin';
export {NgtscProgram} from './lib/ngtsc/program';
export {OptimizeFor} from './lib/ngtsc/typecheck/api';

// **Note**: Explicit named exports to make this file work with CJS/ESM interop without
// needing to use a default import. NodeJS will expose named CJS exports as named ESM exports.
// TODO(devversion): Remove these duplicate exports once devmode&prodmode is combined/ESM.
export {ConsoleLogger, Logger, LogLevel} from './lib/ngtsc/logging';
export {NodeJSFileSystem} from './lib/ngtsc/file_system';

setFileSystem(new NodeJSFileSystem());
