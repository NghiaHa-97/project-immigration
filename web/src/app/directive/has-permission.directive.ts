import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input()
  set appHasPermission(perCode: number){
    console.log('appHasPermission');
  }
}
