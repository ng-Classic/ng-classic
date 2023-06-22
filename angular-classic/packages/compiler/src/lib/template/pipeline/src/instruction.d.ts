/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as o from '../../../output/output_ast';
import * as ir from '../ir';
export declare function element(slot: number, tag: string, constIndex: number | null, localRefIndex: number | null): ir.CreateOp;
export declare function elementStart(slot: number, tag: string, constIndex: number | null, localRefIndex: number | null): ir.CreateOp;
export declare function elementEnd(): ir.CreateOp;
export declare function elementContainerStart(slot: number, constIndex: number | null, localRefIndex: number | null): ir.CreateOp;
export declare function elementContainer(slot: number, constIndex: number | null, localRefIndex: number | null): ir.CreateOp;
export declare function elementContainerEnd(): ir.CreateOp;
export declare function template(slot: number, templateFnRef: o.Expression, decls: number, vars: number, tag: string, constIndex: number): ir.CreateOp;
export declare function listener(name: string, handlerFn: o.Expression): ir.CreateOp;
export declare function pipe(slot: number, name: string): ir.CreateOp;
export declare function advance(delta: number): ir.UpdateOp;
export declare function reference(slot: number): o.Expression;
export declare function nextContext(steps: number): o.Expression;
export declare function getCurrentView(): o.Expression;
export declare function restoreView(savedView: o.Expression): o.Expression;
export declare function resetView(returnValue: o.Expression): o.Expression;
export declare function text(slot: number, initialValue: string): ir.CreateOp;
export declare function property(name: string, expression: o.Expression): ir.UpdateOp;
export declare function pipeBind(slot: number, varOffset: number, args: o.Expression[]): o.Expression;
export declare function pipeBindV(slot: number, varOffset: number, args: o.Expression): o.Expression;
export declare function textInterpolate(strings: string[], expressions: o.Expression[]): ir.UpdateOp;
export declare function propertyInterpolate(name: string, strings: string[], expressions: o.Expression[]): ir.UpdateOp;
export declare function pureFunction(varOffset: number, fn: o.Expression, args: o.Expression[]): o.Expression;
