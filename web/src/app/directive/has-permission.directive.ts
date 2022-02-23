import {ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../store';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {getUserDetailState} from '../store';
import {map, takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnDestroy, OnInit {

  private permissions$: Observable<any>;
  private destroy = new Subject();

  private isPermission$ = new BehaviorSubject(false);
  private isAndCondition$ = new BehaviorSubject(true);

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private store: Store<fromStore.RootState>,
              private changeDetectorRef: ChangeDetectorRef) {

    this.permissions$ = this.store.select(getUserDetailState)
      .pipe(
        map(userDetail => userDetail?.principal?.permissionMap),
        takeUntil(this.destroy)
      );
  }

  @Input()
  set appHasPermission(perCodes: number[] | number) {
    // console.log('appHasPermission', perCode);
    this.permissions$
      .subscribe(per => {
        if (typeof perCodes === 'number') {
          if (!!per && per.hasOwnProperty(perCodes)) {
            // console.log('hasOwnProperty', true);
            this.isPermission$.next(true);
            return;
          }
          // console.log('hasOwnProperty', false);
          this.isPermission$.next(false);
        } else {
          perCodes.some((item) => {
            if (!!per && per.hasOwnProperty(item)) {
              // console.log('hasOwnProperty', true);
              this.isPermission$.next(true);
              return true;
            }
            // console.log('hasOwnProperty', false);
            this.isPermission$.next(false);
          });
        }
      });
  }

  @Input()
  set appHasPermissionAndCondition(andCondition: boolean[]) {
    // console.log(andCondition);
    if (!!andCondition) {
      const isExistFalse = andCondition.some(item => !item);
      // console.log('appHasPermissionAndCondition', !isExistFalse);
      this.isAndCondition$.next(!isExistFalse);
      return;
    }
    // console.log('this.isAndCondition$.next(true);', true);
    this.isAndCondition$.next(true);
  }

  ngOnInit(): void {
    combineLatest([this.isPermission$, this.isAndCondition$])
      .pipe(takeUntil(this.destroy))
      .subscribe(val => {
        // console.log(val);
        if (val.some(item => !item)) {
          // console.log('this.viewContainerRef.clear()');
          this.viewContainerRef.clear();
        } else {
          // console.log('this.viewContainerRef.createEmbeddedView(this.templateRef)');
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.isPermission$.complete();
    this.isAndCondition$.complete();
    this.destroy.complete();
  }
}
