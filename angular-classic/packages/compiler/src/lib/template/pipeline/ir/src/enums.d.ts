/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Distinguishes different kinds of IR operations.
 *
 * Includes both creation and update operations.
 */
export declare enum OpKind {
    /**
     * A special operation type which is used to represent the beginning and end nodes of a linked
     * list of operations.
     */
    ListEnd = 0,
    /**
     * An operation which wraps an output AST statement.
     */
    Statement = 1,
    /**
     * An operation which declares and initializes a `SemanticVariable`.
     */
    Variable = 2,
    /**
     * An operation to begin rendering of an element.
     */
    ElementStart = 3,
    /**
     * An operation to render an element with no children.
     */
    Element = 4,
    /**
     * An operation which declares an embedded view.
     */
    Template = 5,
    /**
     * An operation to end rendering of an element previously started with `ElementStart`.
     */
    ElementEnd = 6,
    /**
     * An operation to begin an `ng-container`.
     */
    ContainerStart = 7,
    /**
     * An operation for an `ng-container` with no children.
     */
    Container = 8,
    /**
     * An operation to end an `ng-container`.
     */
    ContainerEnd = 9,
    /**
     * An operation to render a text node.
     */
    Text = 10,
    /**
     * An operation declaring an event listener for an element.
     */
    Listener = 11,
    /**
     * An operation to interpolate text into a text node.
     */
    InterpolateText = 12,
    /**
     * An operation to bind an expression to a property of an element.
     */
    Property = 13,
    /**
     * An operation to interpolate text into a property binding.
     */
    InterpolateProperty = 14,
    /**
     * An operation to advance the runtime's implicit slot context during the update phase of a view.
     */
    Advance = 15,
    /**
     * An operation to instantiate a pipe.
     */
    Pipe = 16,
    /**
     * An operation to associate an attribute with an element.
     */
    Attribute = 17
}
/**
 * Distinguishes different kinds of IR expressions.
 */
export declare enum ExpressionKind {
    /**
     * Read of a variable in a lexical scope.
     */
    LexicalRead = 0,
    /**
     * A reference to the current view context.
     */
    Context = 1,
    /**
     * Read of a variable declared in a `VariableOp`.
     */
    ReadVariable = 2,
    /**
     * Runtime operation to navigate to the next view context in the view hierarchy.
     */
    NextContext = 3,
    /**
     * Runtime operation to retrieve the value of a local reference.
     */
    Reference = 4,
    /**
     * Runtime operation to snapshot the current view context.
     */
    GetCurrentView = 5,
    /**
     * Runtime operation to restore a snapshotted view.
     */
    RestoreView = 6,
    /**
     * Runtime operation to reset the current view context after `RestoreView`.
     */
    ResetView = 7,
    /**
     * Defines and calls a function with change-detected arguments.
     */
    PureFunctionExpr = 8,
    /**
     * Indicates a positional parameter to a pure function definition.
     */
    PureFunctionParameterExpr = 9,
    /**
     * Binding to a pipe transformation.
     */
    PipeBinding = 10,
    /**
     * Binding to a pipe transformation with a variable number of arguments.
     */
    PipeBindingVariadic = 11,
    SafePropertyRead = 12,
    /**
     * A safe keyed read requiring expansion into a null check.
     */
    SafeKeyedRead = 13,
    /**
     * A safe function call requiring expansion into a null check.
     */
    SafeInvokeFunction = 14,
    /**
     * An intermediate expression that will be expanded from a safe read into an explicit ternary.
     */
    SafeTernaryExpr = 15
}
/**
 * Distinguishes between different kinds of `SemanticVariable`s.
 */
export declare enum SemanticVariableKind {
    /**
     * Represents the context of a particular view.
     */
    Context = 0,
    /**
     * Represents an identifier declared in the lexical scope of a view.
     */
    Identifier = 1,
    /**
     * Represents a saved state that can be used to restore a view in a listener handler function.
     */
    SavedView = 2
}
