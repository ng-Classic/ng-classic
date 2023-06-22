/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ConstantPool } from '../../../constant_pool';
import * as o from '../../../output/output_ast';
import * as ir from '../ir';
/**
 * Compilation-in-progress of a whole component's template, including the main template and any
 * embedded views or host bindings.
 */
export declare class ComponentCompilation {
    readonly componentName: string;
    readonly pool: ConstantPool;
    /**
     * Tracks the next `ir.XrefId` which can be assigned as template structures are ingested.
     */
    private nextXrefId;
    /**
     * Map of view IDs to `ViewCompilation`s.
     */
    readonly views: Map<ir.XrefId, ViewCompilation>;
    /**
     * Constant expressions used by operations within this component's compilation.
     *
     * This will eventually become the `consts` array in the component definition.
     */
    readonly consts: o.Expression[];
    /**
     * The root view, representing the component's template.
     */
    readonly root: ViewCompilation;
    constructor(componentName: string, pool: ConstantPool);
    /**
     * Add a `ViewCompilation` for a new embedded view to this compilation.
     */
    allocateView(parent: ir.XrefId): ViewCompilation;
    /**
     * Generate a new unique `ir.XrefId`.
     */
    allocateXrefId(): ir.XrefId;
    /**
     * Add a constant `o.Expression` to the compilation and return its index in the `consts` array.
     */
    addConst(newConst: o.Expression): ir.ConstIndex;
}
/**
 * Compilation-in-progress of an individual view within a template.
 */
export declare class ViewCompilation {
    readonly tpl: ComponentCompilation;
    readonly xref: ir.XrefId;
    readonly parent: ir.XrefId | null;
    constructor(tpl: ComponentCompilation, xref: ir.XrefId, parent: ir.XrefId | null);
    /**
     * Name of the function which will be generated for this view.
     *
     * May be `null` if not yet determined.
     */
    fnName: string | null;
    /**
     * List of creation operations for this view.
     *
     * Creation operations may internally contain other operations, including update operations.
     */
    readonly create: ir.OpList<ir.CreateOp>;
    /**
     * List of update operations for this view.
     */
    readonly update: ir.OpList<ir.UpdateOp>;
    /**
     * Map of declared variables available within this view to the property on the context object
     * which they alias.
     */
    readonly contextVariables: Map<string, string>;
    /**
     * Number of declaration slots used within this view, or `null` if slots have not yet been
     * allocated.
     */
    decls: number | null;
    /**
     * Number of variable slots used within this view, or `null` if variables have not yet been
     * counted.
     */
    vars: number | null;
    /**
     * Iterate over all `ir.Op`s within this view.
     *
     * Some operations may have child operations, which this iterator will visit.
     */
    ops(): Generator<ir.CreateOp | ir.UpdateOp>;
}
