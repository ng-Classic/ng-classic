/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @fileoverview
 * This file is used as a private API channel to shared Angular Classic FW APIs with @angular-classic/cli.
 *
 * Any changes to this file should be discussed with the Angular Classic CLI team.
 */

import ts from 'typescript';

import {TypeScriptReflectionHost} from '../src/ngtsc/reflection';
import {getDownlevelDecoratorsTransform} from '../src/transformers/downlevel_decorators_transform/index';

/**
 * Known values for global variables in `@angular-classic/core` that Terser should set using
 * https://github.com/terser-js/terser#conditional-compilation
 */
export const GLOBAL_DEFS_FOR_TERSER = {
  ngDevMode: false,
  ngI18nClosureMode: false,
};

export const GLOBAL_DEFS_FOR_TERSER_WITH_AOT = {
  ...GLOBAL_DEFS_FOR_TERSER,
  ngJitMode: false,
};

/**
 * Transform for downleveling Angular Classic decorators and Angular-decorated class constructor
 * parameters for dependency injection. This transform can be used by the CLI for JIT-mode
 * compilation where constructor parameters and associated Angular Classic decorators should be
 * downleveled so that apps are not exposed to the ES2015 temporal dead zone limitation
 * in TypeScript. See https://github.com/ng-classic/ng-classic-cli/pull/14473 for more details.
 */
export function constructorParametersDownlevelTransform(program: ts.Program):
    ts.TransformerFactory<ts.SourceFile> {
  const typeChecker = program.getTypeChecker();
  const reflectionHost = new TypeScriptReflectionHost(typeChecker);
  return getDownlevelDecoratorsTransform(
      typeChecker, reflectionHost, [], /* isCore */ false,
      /* enableClosureCompiler */ false);
}
