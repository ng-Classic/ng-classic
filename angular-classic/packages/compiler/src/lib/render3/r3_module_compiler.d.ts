/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { R3DeclareNgModuleFacade } from '../compiler_facade_interface';
import * as o from '../output/output_ast';
import { R3CompiledExpression, R3Reference } from './util';
/**
 * How the selector scope of an NgModule (its declarations, imports, and exports) should be emitted
 * as a part of the NgModule definition.
 */
export declare enum R3SelectorScopeMode {
    /**
     * Emit the declarations inline into the module definition.
     *
     * This option is useful in certain contexts where it's known that JIT support is required. The
     * tradeoff here is that this emit style prevents directives and pipes from being tree-shaken if
     * they are unused, but the NgModule is used.
     */
    Inline = 0,
    /**
     * Emit the declarations using a side effectful function call, `ɵɵsetNgModuleScope`, that is
     * guarded with the `ngJitMode` flag.
     *
     * This form of emit supports JIT and can be optimized away if the `ngJitMode` flag is set to
     * false, which allows unused directives and pipes to be tree-shaken.
     */
    SideEffect = 1,
    /**
     * Don't generate selector scopes at all.
     *
     * This is useful for contexts where JIT support is known to be unnecessary.
     */
    Omit = 2
}
/**
 * Metadata required by the module compiler to generate a module def (`ɵmod`) for a type.
 */
export interface R3NgModuleMetadata {
    /**
     * An expression representing the module type being compiled.
     */
    type: R3Reference;
    /**
     * An array of expressions representing the bootstrap components specified by the module.
     */
    bootstrap: R3Reference[];
    /**
     * An array of expressions representing the directives and pipes declared by the module.
     */
    declarations: R3Reference[];
    /**
     * Those declarations which should be visible to downstream consumers. If not specified, all
     * declarations are made visible to downstream consumers.
     */
    publicDeclarationTypes: o.Expression[] | null;
    /**
     * An array of expressions representing the imports of the module.
     */
    imports: R3Reference[];
    /**
     * Whether or not to include `imports` in generated type declarations.
     */
    includeImportTypes: boolean;
    /**
     * An array of expressions representing the exports of the module.
     */
    exports: R3Reference[];
    /**
     * How to emit the selector scope values (declarations, imports, exports).
     */
    selectorScopeMode: R3SelectorScopeMode;
    /**
     * Whether to generate closure wrappers for bootstrap, declarations, imports, and exports.
     */
    containsForwardDecls: boolean;
    /**
     * The set of schemas that declare elements to be allowed in the NgModule.
     */
    schemas: R3Reference[] | null;
    /** Unique ID or expression representing the unique ID of an NgModule. */
    id: o.Expression | null;
}
/**
 * Construct an `R3NgModuleDef` for the given `R3NgModuleMetadata`.
 */
export declare function compileNgModule(meta: R3NgModuleMetadata): R3CompiledExpression;
/**
 * This function is used in JIT mode to generate the call to `ɵɵdefineNgModule()` from a call to
 * `ɵɵngDeclareNgModule()`.
 */
export declare function compileNgModuleDeclarationExpression(meta: R3DeclareNgModuleFacade): o.Expression;
export declare function createNgModuleType({ type: moduleType, declarations, exports, imports, includeImportTypes, publicDeclarationTypes }: R3NgModuleMetadata): o.ExpressionType;
