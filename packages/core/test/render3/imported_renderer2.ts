/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ɵAnimationEngine, ɵNoopAnimationStyleNormalizer} from '@angular-classic/animations/browser';
import {MockAnimationDriver} from '@angular-classic/animations/browser/testing';
import {PLATFORM_BROWSER_ID, PLATFORM_SERVER_ID} from '@angular-classic/common/src/platform_id';
import {NgZone, RendererFactory2, RendererType2} from '@angular-classic/core';
import {NoopNgZone} from '@angular-classic/core/src/zone/ng_zone';
import {EventManager, ɵDomRendererFactory2, ɵSharedStylesHost} from '@angular-classic/platform-browser';
import {ɵAnimationRendererFactory} from '@angular-classic/platform-browser/animations';
import {EventManagerPlugin} from '@angular-classic/platform-browser/src/dom/events/event_manager';
import {isTextNode} from '@angular-classic/platform-browser/testing/src/browser_util';

export class SimpleDomEventsPlugin extends EventManagerPlugin {
  constructor(doc: any) {
    super(doc);
  }

  override supports(eventName: string): boolean {
    return true;
  }

  override addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    let callback: EventListener = handler as EventListener;
    element.addEventListener(eventName, callback, false);
    return () => this.removeEventListener(element, eventName, callback);
  }

  removeEventListener(target: any, eventName: string, callback: Function): void {
    return target.removeEventListener.apply(target, [eventName, callback, false]);
  }
}

export function getRendererFactory2(document: any): RendererFactory2 {
  const fakeNgZone: NgZone = new NoopNgZone();
  const eventManager = new EventManager([new SimpleDomEventsPlugin(document)], fakeNgZone);
  const appId = 'appid';
  const rendererFactory = new ɵDomRendererFactory2(
      eventManager, new ɵSharedStylesHost(document, appId), appId, true, document,
      isNode ? PLATFORM_SERVER_ID : PLATFORM_BROWSER_ID, fakeNgZone);
  const origCreateRenderer = rendererFactory.createRenderer;
  rendererFactory.createRenderer = function(element: any, type: RendererType2|null) {
    const renderer = origCreateRenderer.call(this, element, type);
    renderer.destroyNode = () => {};
    return renderer;
  };
  return rendererFactory;
}

export function getAnimationRendererFactory2(document: any): RendererFactory2 {
  const fakeNgZone: NgZone = new NoopNgZone();
  return new ɵAnimationRendererFactory(
      getRendererFactory2(document),
      new ɵAnimationEngine(
          document.body, new MockAnimationDriver(), new ɵNoopAnimationStyleNormalizer()),
      fakeNgZone);
}

// TODO: code duplicated from ../linker/change_detection_integration_spec.ts, to be removed
// START duplicated code
export class RenderLog {
  log: string[] = [];
  loggedValues: any[] = [];

  setElementProperty(el: any, propName: string, propValue: any) {
    this.log.push(`${propName}=${propValue}`);
    this.loggedValues.push(propValue);
  }

  setText(node: any, value: string) {
    this.log.push(`{{${value}}}`);
    this.loggedValues.push(value);
  }

  clear() {
    this.log = [];
    this.loggedValues = [];
  }
}

/**
 * This function patches the DomRendererFactory2 so that it returns a DefaultDomRenderer2
 * which logs some of the DOM operations through a RenderLog instance.
 */
export function patchLoggingRenderer2(rendererFactory: RendererFactory2, log: RenderLog) {
  if ((<any>rendererFactory).__patchedForLogging) {
    return;
  }
  (<any>rendererFactory).__patchedForLogging = true;
  const origCreateRenderer = rendererFactory.createRenderer;
  rendererFactory.createRenderer = function(element: any, type: RendererType2|null) {
    const renderer = origCreateRenderer.call(this, element, type);
    if ((<any>renderer).__patchedForLogging) {
      return renderer;
    }
    (<any>renderer).__patchedForLogging = true;
    const origSetProperty = renderer.setProperty;
    const origSetValue = renderer.setValue;
    renderer.setProperty = function(el: any, name: string, value: any): void {
      log.setElementProperty(el, name, value);
      origSetProperty.call(renderer, el, name, value);
    };
    renderer.setValue = function(node: any, value: string): void {
      if (isTextNode(node)) {
        log.setText(node, value);
      }
      origSetValue.call(renderer, node, value);
    };
    return renderer;
  };
}
// END duplicated code
