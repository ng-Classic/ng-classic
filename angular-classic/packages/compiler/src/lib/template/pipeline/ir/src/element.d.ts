/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as o from '../../../../output/output_ast';
/**
 * Enumeration of the types of attributes which can be applied to an element.
 */
export declare enum ElementAttributeKind {
    /**
     * Static attributes.
     */
    Attribute = 0,
    /**
     * Class bindings.
     */
    Class = 1,
    /**
     * Style bindings.
     */
    Style = 2,
    /**
     * Dynamic property or attribute bindings.
     */
    Binding = 3,
    /**
     * Attributes on a template node.
     */
    Template = 4,
    /**
     * Internationalized attributes.
     */
    I18n = 5
}
/**
 * Container for all of the various kinds of attributes which are applied on an element.
 */
export declare class ElementAttributes {
    private known;
    private byKind;
    projectAs: string | null;
    get attributes(): ReadonlyArray<o.Expression>;
    get classes(): ReadonlyArray<o.Expression>;
    get styles(): ReadonlyArray<o.Expression>;
    get bindings(): ReadonlyArray<o.Expression>;
    get template(): ReadonlyArray<o.Expression>;
    get i18n(): ReadonlyArray<o.Expression>;
    add(kind: ElementAttributeKind, name: string, value: o.Expression | null): void;
    private arrayFor;
}
export declare function assertIsElementAttributes(attrs: any): asserts attrs is ElementAttributes;
