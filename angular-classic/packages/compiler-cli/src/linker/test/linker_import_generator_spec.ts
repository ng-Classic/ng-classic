/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {LinkerImportGenerator} from '../src/linker_import_generator';

const ngImport = {
  ngImport: true
};

describe('LinkerImportGenerator<TExpression>', () => {
  describe('generateNamespaceImport()', () => {
    it('should error if the import is not `@angular-classic/core`', () => {
      const generator = new LinkerImportGenerator(ngImport);
      expect(() => generator.generateNamespaceImport('other/import'))
          .toThrowError(`Unable to import from anything other than '@angular-classic/core'`);
    });

    it('should return the ngImport expression for `@angular-classic/core`', () => {
      const generator = new LinkerImportGenerator(ngImport);
      expect(generator.generateNamespaceImport('@angular-classic/core')).toBe(ngImport);
    });
  });

  describe('generateNamedImport()', () => {
    it('should error if the import is not `@angular-classic/core`', () => {
      const generator = new LinkerImportGenerator(ngImport);
      expect(() => generator.generateNamedImport('other/import', 'someSymbol'))
          .toThrowError(`Unable to import from anything other than '@angular-classic/core'`);
    });

    it('should return a `NamedImport` object containing the ngImport expression', () => {
      const generator = new LinkerImportGenerator(ngImport);
      expect(generator.generateNamedImport('@angular-classic/core', 'someSymbol'))
          .toEqual({moduleImport: ngImport, symbol: 'someSymbol'});
    });
  });
});
