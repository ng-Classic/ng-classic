/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

describe('Angular ClassicElements', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should recognize the zippy as an Angular ClassicElement', () => {
    cy.get('.tree-wrapper').find('.tree-node:contains("app-zippy")').its('length').should('eq', 1);
  });
});
