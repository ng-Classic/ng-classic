import { Tree, readJson } from '@nx/devkit';
import { writeJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import migration from './rename-angular-eslint-accesibility-rules';

describe('rename-angular-eslint-accesibility-rules migration', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should rename relevant rules keeping their config and handling overrides', async () => {
    writeJson(tree, '.eslintrc.json', {
      rules: {
        '@angular-classic-eslint/component-class-suffix': [
          'error',
          { suffixes: ['Page', 'View'] },
        ],
        '@angular-classic-eslint/template/accessibility-alt-text': ['error'],
        '@angular-classic-eslint/template/no-call-expression': ['error'],
        '@angular-classic-eslint/template/accessibility-role-has-required-aria': [
          'error',
        ],
      },
      overrides: [
        {
          files: ['*.ts'],
          rules: {
            '@angular-classic-eslint/component-class-suffix': [
              'warn',
              { suffixes: ['Page', 'View'] },
            ],
          },
        },
        {
          files: ['*.html'],
          rules: {
            '@angular-classic-eslint/template/accessibility-alt-text': ['warn'],
            '@angular-classic-eslint/template/no-call-expression': ['warn'],
            '@angular-classic-eslint/template/accessibility-role-has-required-aria': [
              'warn',
            ],
          },
        },
      ],
    });

    await migration(tree);

    expect(readJson(tree, '.eslintrc.json')).toMatchInlineSnapshot(`
      {
        "overrides": [
          {
            "files": [
              "*.ts",
            ],
            "rules": {
              "@angular-classic-eslint/component-class-suffix": [
                "warn",
                {
                  "suffixes": [
                    "Page",
                    "View",
                  ],
                },
              ],
            },
          },
          {
            "files": [
              "*.html",
            ],
            "rules": {
              "@angular-classic-eslint/template/alt-text": [
                "warn",
              ],
              "@angular-classic-eslint/template/no-call-expression": [
                "warn",
              ],
              "@angular-classic-eslint/template/role-has-required-aria": [
                "warn",
              ],
            },
          },
        ],
        "rules": {
          "@angular-classic-eslint/component-class-suffix": [
            "error",
            {
              "suffixes": [
                "Page",
                "View",
              ],
            },
          ],
          "@angular-classic-eslint/template/alt-text": [
            "error",
          ],
          "@angular-classic-eslint/template/no-call-expression": [
            "error",
          ],
          "@angular-classic-eslint/template/role-has-required-aria": [
            "error",
          ],
        },
      }
    `);
  });
});
