import {Component, Directive, NgModule, TemplateRef} from '@angular-classic/core';

@Component({selector: 'simple', template: '<ng-content *ngIf="showContent"></ng-content>'})
export class SimpleComponent {
}
