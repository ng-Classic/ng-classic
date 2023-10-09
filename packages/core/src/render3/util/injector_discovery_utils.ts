/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from '../../di/injection_token';
import {Injector} from '../../di/injector';
import {getInjectorDef, InjectorType} from '../../di/interface/defs';
import {InjectFlags, InternalInjectFlags} from '../../di/interface/injector';
import {NullInjector} from '../../di/null_injector';
import {SingleProvider, walkProviderTree} from '../../di/provider_collection';
import {EnvironmentInjector, R3Injector} from '../../di/r3_injector';
import {Type} from '../../interface/type';
import {NgModuleRef as viewEngine_NgModuleRef} from '../../linker/ng_module_factory';
import {deepForEach} from '../../util/array_utils';
import {throwError} from '../../util/assert';
import type {ChainedInjector} from '../component_ref';
import {getComponentDef} from '../definition';
import {getNodeInjectorLView, getNodeInjectorTNode, getParentInjectorLocation, NodeInjector} from '../di';
import {getFrameworkDIDebugData} from '../debug/framework_injector_profiler';
import {InjectedService, ProviderRecord} from '../debug/injector_profiler';
import {NodeInjectorOffset} from '../interfaces/injector';
import {TContainerNode, TElementContainerNode, TElementNode, TNode} from '../interfaces/node';
import {INJECTOR, LView, TVIEW} from '../interfaces/view';

import {getParentInjectorIndex, getParentInjectorView, hasParentInjector} from './injector_utils';

/**
 * Discovers the dependencies of an injectable instance. Provides DI information about each
 * dependency that the injectable was instantiated with, including where they were provided from.
 *
 * @param injector An injector instance
 * @param token a DI token that was constructed by the given injector instance
 * @returns an object that contains the created instance of token as well as all of the dependencies
 * that it was instantiated with OR undefined if the token was not created within the given
 * injector.
 */
export function getDependenciesFromInjectable<T>(
    injector: Injector,
    token: Type<T>|InjectionToken<T>): {instance: T; dependencies: InjectedService[]}|undefined {
  // First we check to see if the token given maps to an actual instance in the injector given.
  // We use `self: true` because we only want to look at the injector we were given.
  // We use `optional: true` because it's possible that the token we were given was never
  // constructed by the injector we were given.
  const instance = injector.get(token, null, {self: true, optional: true});
  if (instance === null) {
    throw new Error(`Unable to determine instance of ${token} in given injector`);
  }

  let diResolver: Injector|LView = injector;
  if (injector instanceof NodeInjector) {
    diResolver = getNodeInjectorLView(injector);
  }

  const {resolverToTokenToDependencies} = getFrameworkDIDebugData();

  let dependencies =
      resolverToTokenToDependencies.get(diResolver)?.get?.(token as Type<unknown>) ?? [];

  const resolutionPath = getInjectorResolutionPath(injector);
  dependencies = dependencies.map(dep => {
    const flags = dep.flags as InternalInjectFlags;
    dep.flags = {
      optional: (InternalInjectFlags.Optional & flags) === InternalInjectFlags.Optional,
      host: (InternalInjectFlags.Host & flags) === InternalInjectFlags.Host,
      self: (InternalInjectFlags.Self & flags) === InternalInjectFlags.Self,
      skipSelf: (InternalInjectFlags.SkipSelf & flags) === InternalInjectFlags.SkipSelf,
    };

    for (let i = 0; i < resolutionPath.length; i++) {
      const injectorToCheck = resolutionPath[i];

      // if skipSelf is true we skip the first injector
      if (i === 0 && dep.flags.skipSelf) {
        continue;
      }

      // host only applies to NodeInjectors
      if (dep.flags.host && injectorToCheck instanceof EnvironmentInjector) {
        break;
      }

      const instance =
          injectorToCheck.get(dep.token as Type<unknown>, null, {self: true, optional: true});

      if (instance !== null) {
        // if host flag is true we double check that we can get the service from the first element
        // in the resolution path by using the host flag. This is done to make sure that we've found
        // the correct providing injector, and not a node injector that is connected to our path via
        // a router outlet.
        if (dep.flags.host) {
          const firstInjector = resolutionPath[0];
          const lookupFromFirstInjector =
              firstInjector.get(dep.token as Type<unknown>, null, {...dep.flags, optional: true});

          if (lookupFromFirstInjector !== null) {
            dep.providedIn = injectorToCheck;
          }

          break;
        }

        dep.providedIn = injectorToCheck;
        break;
      }

      // if self is true we stop after the first injector
      if (i === 0 && dep.flags.self) {
        break;
      }
    }

    return dep;
  });

  return {instance, dependencies};
}

/**
 * Gets the class associated with an injector that contains a provider `imports` array in it's
 * definition
 *
 * For Module Injectors this returns the NgModule constructor.
 *
 * For Standalone injectors this returns the standalone component constructor.
 *
 * @param injector Injector an injector instance
 * @returns the constructor where the `imports` array that configures this injector is located
 */
function getProviderImportsContainer(injector: Injector): Type<unknown>|null {
  const {standaloneInjectorToComponent} = getFrameworkDIDebugData();

  // standalone components configure providers through a component def, so we have to
  // use the standalone component associated with this injector if Injector represents
  // a standalone components EnvironmentInjector
  if (standaloneInjectorToComponent.has(injector)) {
    return standaloneInjectorToComponent.get(injector)!;
  }

  // Module injectors configure providers through their NgModule def, so we use the
  // injector to lookup its NgModuleRef and through that grab its instance
  const defTypeRef = injector.get(viewEngine_NgModuleRef, null, {self: true, optional: true})!;

  // If we can't find an associated imports container, return null.
  // This could be the case if this function is called with an R3Injector that does not represent
  // a standalone component or NgModule.
  if (defTypeRef === null) {
    return null;
  }

  return defTypeRef.instance.constructor;
}

/**
 * Gets the providers configured on a NodeInjector
 *
 * @param injector A NodeInjector instance
 * @returns ProviderRecord[] an array of objects representing the providers configured on this
 *     injector
 */
function getNodeInjectorProviders(injector: NodeInjector): ProviderRecord[] {
  const diResolver = getNodeInjectorLView(injector);
  const {resolverToProviders} = getFrameworkDIDebugData();
  return resolverToProviders.get(diResolver) ?? [];
}

/**
 * Gets a mapping of providers configured on an injector to their import paths
 *
 * ModuleA -> imports ModuleB
 * ModuleB -> imports ModuleC
 * ModuleB -> provides MyServiceA
 * ModuleC -> provides MyServiceB
 *
 * getProviderImportPaths(ModuleA)
 * > Map(2) {
 *   MyServiceA => [ModuleA, ModuleB]
 *   MyServiceB => [ModuleA, ModuleB, ModuleC]
 *  }
 *
 * @param providerImportsContainer constructor of class that contains an `imports` array in it's
 *     definition
 * @returns A Map object that maps providers to an array of constructors representing it's import
 *     path
 *
 */
function getProviderImportPaths(providerImportsContainer: Type<unknown>):
    Map<SingleProvider, (Type<unknown>| InjectorType<unknown>)[]> {
  const providerToPath = new Map<SingleProvider, (Type<unknown>| InjectorType<unknown>)[]>();
  const visitedContainers = new Set<Type<unknown>>();
  const visitor = walkProviderTreeToDiscoverImportPaths(providerToPath, visitedContainers);

  walkProviderTree(providerImportsContainer, visitor, [], new Set());

  return providerToPath;
}

/**
 *
 * Higher order function that returns a visitor for WalkProviderTree
 *
 * Takes in a Map and Set to keep track of the providers and containers
 * visited, so that we can discover the import paths of these providers
 * during the traversal.
 *
 * This visitor takes advantage of the fact that walkProviderTree performs a
 * postorder traversal of the provider tree for the passed in container. Because postorder
 * traversal recursively processes subtrees from leaf nodes until the traversal reaches the root,
 * we write a visitor that constructs provider import paths in reverse.
 *
 *
 * We use the visitedContainers set defined outside this visitor
 * because we want to run some logic only once for
 * each container in the tree. That logic can be described as:
 *
 *
 * 1. for each discovered_provider and discovered_path in the incomplete provider paths we've
 * already discovered
 * 2. get the first container in discovered_path
 * 3. if that first container is in the imports array of the container we're visiting
 *    Then the container we're visiting is also in the import path of discovered_provider, so we
 *    unshift discovered_path with the container we're currently visiting
 *
 *
 * Example Run:
 * ```
 *                 ┌──────────┐
 *                 │containerA│
 *      ┌─imports-─┤          ├──imports─┐
 *      │          │  provA   │          │
 *      │          │  provB   │          │
 *      │          └──────────┘          │
 *      │                                │
 *     ┌▼─────────┐             ┌────────▼─┐
 *     │containerB│             │containerC│
 *     │          │             │          │
 *     │  provD   │             │  provF   │
 *     │  provE   │             │  provG   │
 *     └──────────┘             └──────────┘
 * ```
 *
 * Each step of the traversal,
 *
 * ```
 * visitor(provD, containerB)
 * providerToPath === Map { provD => [containerB] }
 * visitedContainers === Set { containerB }
 *
 * visitor(provE, containerB)
 * providerToPath === Map { provD => [containerB], provE => [containerB] }
 * visitedContainers === Set { containerB }
 *
 * visitor(provF, containerC)
 * providerToPath === Map { provD => [containerB], provE => [containerB], provF => [containerC] }
 * visitedContainers === Set { containerB, containerC }
 *
 * visitor(provG, containerC)
 * providerToPath === Map {
 *   provD => [containerB], provE => [containerB], provF => [containerC], provG => [containerC]
 * }
 * visitedContainers === Set { containerB, containerC }
 *
 * visitor(provA, containerA)
 * providerToPath === Map {
 *   provD => [containerA, containerB],
 *   provE => [containerA, containerB],
 *   provF => [containerA, containerC],
 *   provG => [containerA, containerC],
 *   provA => [containerA]
 * }
 * visitedContainers === Set { containerB, containerC, containerA }
 *
 * visitor(provB, containerA)
 * providerToPath === Map {
 *   provD => [containerA, containerB],
 *   provE => [containerA, containerB],
 *   provF => [containerA, containerC],
 *   provG => [containerA, containerC],
 *   provA => [containerA]
 *   provB => [containerA]
 * }
 * visitedContainers === Set { containerB, containerC, containerA }
 * ```
 *
 * @param providerToPath Map map of providers to paths that this function fills
 * @param visitedContainers Set a set to keep track of the containers we've already visited
 * @return function(provider SingleProvider, container: Type<unknown> | InjectorType<unknown>) =>
 *     void
 */
function walkProviderTreeToDiscoverImportPaths(
    providerToPath: Map<SingleProvider, (Type<unknown>| InjectorType<unknown>)[]>,
    visitedContainers: Set<Type<unknown>>):
    (provider: SingleProvider, container: Type<unknown>|InjectorType<unknown>) => void {
  return (provider: SingleProvider, container: Type<unknown>|InjectorType<unknown>) => {
    // If the provider is not already in the providerToPath map,
    // add an entry with the provider as the key and an array containing the current container as
    // the value
    if (!providerToPath.has(provider)) {
      providerToPath.set(provider, [container]);
    }

    // This block will run exactly once for each container in the import tree.
    // This is where we run the logic to check the imports array of the current
    // container to see if it's the next container in the path for our currently
    // discovered providers.
    if (!visitedContainers.has(container)) {
      // Iterate through the providers we've already seen
      for (const prov of providerToPath.keys()) {
        const existingImportPath = providerToPath.get(prov)!;

        let containerDef = getInjectorDef(container);
        if (!containerDef) {
          const ngModule: Type<unknown>|undefined =
              (container as any).ngModule as Type<unknown>| undefined;
          containerDef = getInjectorDef(ngModule);
        }

        if (!containerDef) {
          return;
        }

        const lastContainerAddedToPath = existingImportPath[0];

        let isNextStepInPath = false;
        deepForEach(containerDef.imports, (moduleImport) => {
          if (isNextStepInPath) {
            return;
          }

          isNextStepInPath = (moduleImport as any).ngModule === lastContainerAddedToPath ||
              moduleImport === lastContainerAddedToPath;

          if (isNextStepInPath) {
            providerToPath.get(prov)?.unshift(container);
          }
        });
      }
    }

    visitedContainers.add(container);
  };
}

/**
 * Gets the providers configured on an EnvironmentInjector
 *
 * @param injector EnvironmentInjector
 * @returns an array of objects representing the providers of the given injector
 */
function getEnvironmentInjectorProviders(injector: EnvironmentInjector): ProviderRecord[] {
  const providerImportsContainer = getProviderImportsContainer(injector);
  if (providerImportsContainer === null) {
    throwError('Could not determine where injector providers were configured.');
  }

  const providerToPath = getProviderImportPaths(providerImportsContainer);
  const providerRecords = getFrameworkDIDebugData().resolverToProviders.get(injector) ?? [];

  return providerRecords.map(providerRecord => {
    let importPath = providerToPath.get(providerRecord.provider) ?? [providerImportsContainer];

    const def = getComponentDef(providerImportsContainer);
    const isStandaloneComponent = !!def?.standalone;
    // We prepend the component constructor in the standalone case
    // because walkProviderTree does not visit this constructor during it's traversal
    if (isStandaloneComponent) {
      importPath = [providerImportsContainer, ...providerToPath.get(providerRecord.provider) ?? []];
    }

    return {...providerRecord, importPath};
  });
}

/**
 * Gets the providers configured on an injector.
 *
 * @param injector the injector to lookup the providers of
 * @returns ProviderRecord[] an array of objects representing the providers of the given injector
 */
export function getInjectorProviders(injector: Injector): ProviderRecord[] {
  if (injector instanceof NodeInjector) {
    return getNodeInjectorProviders(injector);
  } else if (injector instanceof EnvironmentInjector) {
    return getEnvironmentInjectorProviders(injector as EnvironmentInjector);
  }

  throwError('getInjectorProviders only supports NodeInjector and EnvironmentInjector');
}

export function getInjectorResolutionPath(injector: Injector): Injector[] {
  const resolutionPath: Injector[] = [injector];
  getInjectorResolutionPathHelper(injector, resolutionPath);
  return resolutionPath;
}

function getInjectorResolutionPathHelper(
    injector: Injector, resolutionPath: Injector[]): Injector[] {
  const parent = getInjectorParent(injector);

  // if getInjectorParent can't find a parent, then we've either reached the end
  // of the path, or we need to move from the Element Injector tree to the
  // module injector tree using the first injector in our path as the connection point.
  if (parent === null) {
    if (injector instanceof NodeInjector) {
      const firstInjector = resolutionPath[0];
      if (firstInjector instanceof NodeInjector) {
        const moduleInjector = getModuleInjectorOfNodeInjector(firstInjector);
        if (moduleInjector === null) {
          throwError('NodeInjector must have some connection to the module injector tree');
        }

        resolutionPath.push(moduleInjector);
        getInjectorResolutionPathHelper(moduleInjector, resolutionPath);
      }

      return resolutionPath;
    }
  } else {
    resolutionPath.push(parent);
    getInjectorResolutionPathHelper(parent, resolutionPath);
  }

  return resolutionPath;
}

/**
 * Gets the parent of an injector.
 *
 * This function is not able to make the jump from the Element Injector Tree to the Module
 * injector tree. This is because the "parent" (the next step in the reoslution path)
 * of a root NodeInjector is dependent on which NodeInjector ancestor initiated
 * the DI lookup. See getInjectorResolutionPath for a function that can make this jump.
 *
 * In the below diagram:
 * ```ts
 * getInjectorParent(NodeInjectorB)
 *  > NodeInjectorA
 * getInjectorParent(NodeInjectorA) // or getInjectorParent(getInjectorParent(NodeInjectorB))
 *  > null // cannot jump to ModuleInjector tree
 * ```
 *
 * ```
 *                ┌───────┐                ┌───────────────────┐
 *    ┌───────────┤ModuleA├───Injector────►│EnvironmentInjector│
 *    │           └───┬───┘                └───────────────────┘
 *    │               │
 *    │           bootstraps
 *    │               │
 *    │               │
 *    │          ┌────▼─────┐                 ┌─────────────┐
 * declares      │ComponentA├────Injector────►│NodeInjectorA│
 *    │          └────┬─────┘                 └─────▲───────┘
 *    │               │                             │
 *    │            renders                        parent
 *    │               │                             │
 *    │          ┌────▼─────┐                 ┌─────┴───────┐
 *    └─────────►│ComponentB├────Injector────►│NodeInjectorB│
 *               └──────────┘                 └─────────────┘
 *```
 *
 * @param injector an Injector to get the parent of
 * @returns Injector the parent of the given injector
 */
function getInjectorParent(injector: Injector): Injector|null {
  if (injector instanceof R3Injector) {
    return injector.parent;
  }

  let tNode: TElementNode|TContainerNode|TElementContainerNode|null;
  let lView: LView<unknown>;
  if (injector instanceof NodeInjector) {
    tNode = getNodeInjectorTNode(injector);
    lView = getNodeInjectorLView(injector);
  } else if (injector instanceof NullInjector) {
    return null;
  } else {
    throwError(
        'getInjectorParent only support injectors of type R3Injector, NodeInjector, NullInjector');
  }

  const parentLocation = getParentInjectorLocation(
      tNode as TElementNode | TContainerNode | TElementContainerNode, lView);

  if (hasParentInjector(parentLocation)) {
    const parentInjectorIndex = getParentInjectorIndex(parentLocation);
    const parentLView = getParentInjectorView(parentLocation, lView);
    const parentTView = parentLView[TVIEW];
    const parentTNode = parentTView.data[parentInjectorIndex + NodeInjectorOffset.TNODE] as TNode;
    return new NodeInjector(
        parentTNode as TElementNode | TContainerNode | TElementContainerNode, parentLView);
  } else {
    const chainedInjector = lView[INJECTOR] as ChainedInjector;

    // Case where chainedInjector.injector is an OutletInjector and chainedInjector.injector.parent
    // is a NodeInjector.
    // todo(aleksanderbodurri): ideally nothing in packages/core should deal
    // directly with router concerns. Refactor this so that we can make the jump from
    // NodeInjector -> OutletInjector -> NodeInjector
    // without explictly relying on types contracts from packages/router
    const injectorParent = (chainedInjector.injector as any)?.parent as Injector;

    if (injectorParent instanceof NodeInjector) {
      return injectorParent;
    }
  }

  return null;
}

/**
 * Gets the module injector of a NodeInjector.
 *
 * @param injector NodeInjector to get module injector of
 * @returns Injector representing module injector of the given NodeInjector
 */
function getModuleInjectorOfNodeInjector(injector: NodeInjector): Injector {
  let lView: LView<unknown>;
  if (injector instanceof NodeInjector) {
    lView = getNodeInjectorLView(injector);
  } else {
    throwError('getModuleInjectorOfNodeInjector must be called with a NodeInjector');
  }

  const chainedInjector = lView[INJECTOR] as ChainedInjector;
  const moduleInjector = chainedInjector.parentInjector;
  if (!moduleInjector) {
    throwError('NodeInjector must have some connection to the module injector tree');
  }

  return moduleInjector;
}
