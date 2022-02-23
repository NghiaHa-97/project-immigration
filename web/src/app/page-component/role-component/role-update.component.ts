import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import * as _ from 'lodash';

import {filter, map, skip, switchMap, take, tap} from 'rxjs/operators';
import {
  CreateRole,
  Go,
  LoadModule, UpdateRole,
} from '../../store';
import {getPrefixID} from '../../constans/prefix-id.const';

import {SelectionModel} from '@angular/cdk/collections';
import {TodoItemFlatNode, TodoItemNode} from '../../common-component/tree-checkbox/tree-checkbox.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogCanDeactivateComponent, IDeactivate} from '../can-deactivate';
import {PermissionConst} from '../../constans/Permission.const';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleUpdateComponent implements OnInit, IDeactivate, OnDestroy {
  PermissionConst = PermissionConst;
  @ViewChild('dialogUpdate', {
    static: true
  }) dialogUpdate!: TemplateRef<any>;
  formRole: FormGroup;
  initFormRole = {name: ''};
  entityDetail$ = new BehaviorSubject<any>(null);
  isDetail$!: Observable<boolean>;
  entityRole: any;
  checklistSelection: SelectionModel<TodoItemFlatNode> = new SelectionModel<TodoItemFlatNode>(true);
  data$!: Observable<TodoItemNode[]>;
  initSelected$!: Observable<number[]>;
  permissionsDetail$!: Observable<number[]>;

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private dialog: MatDialog) {
    this.formRole = this.fb.group({
      name: ['', Validators.required]
    });

  }


  ngOnInit(): void {
    this.store.dispatch(new LoadModule(null));
    this.data$ = this.store.select(fromStore.getModuleTodoItemNodeState);

    this.store.select(fromStore.getRouterParamsState).pipe(
      switchMap((data: any) => {
        if (data?.id) {
          return this.store.select(fromStore.getRoleEntitiesState).pipe(
            map(entities => entities[getPrefixID(data?.id)])
          );
        }
        return of(null);
      }),
      take(1)
      // map(entity => entity)
    ).subscribe(entity => {
      if (!!entity) {
        this.entityRole = entity;
        this.entityDetail$.next(entity);
      }
    });

    this.isDetail$ = this.entityDetail$.pipe(
      tap(entity => {
        this.formRole.patchValue({name: entity?.name ?? ''});
      }),
      map(entity => !!entity)
    );

    this.permissionsDetail$ = this.entityDetail$.pipe(
      map((entity: any) =>
        entity?.permissions?.map((item: any) => item.id) ?? [])
    );

    // this.store.dispatch((new LoadDetailRole(1)));
    // this.permissionsDetail$ = this.store.select(fromStore.getRoleEntitiesState)
    //   .pipe(map(entities =>
    //     entities[getPrefixID(1)]?.permissionRoles?.map((item: any) => item.permissionID) ?? [])
    //   );
  }


  onSubmit(): void {
    const role = {
      name: this.formRole.value.name,
      permissions: this.checklistSelection.selected.filter(item => item.level === 1).map(item => {
        return {id: item.id};
      })
    };

    if (!!this.entityRole) {
      // update
      console.log('update', {...this.entityRole, ...role});
      const dialogRef = this.dialog.open(this.dialogUpdate, {
        width: '20%'
      });
      dialogRef.afterClosed()
        .pipe(take(1))
        .subscribe(result => {
          if (result) {
            this.store.dispatch(new UpdateRole({...this.entityRole, ...role}));
          }
        });
    } else {
      // create
      console.log('create', role);
      this.store.dispatch(new CreateRole(role));
      this.store.select(fromStore.getRoleResponseStatusState).pipe(
        skip(1),
        map(({status}) => status),
        filter(isNotNull => !!isNotNull),
        take(1)
      ).subscribe(status => {
        console.log(status);
        if (status === '200') {
          this.formRole.reset();
          this.checklistSelection = new SelectionModel<TodoItemFlatNode>(true);
        }
      });
    }
  }


  back(): void {
    this.store.dispatch(new Go({path: ['quan-ly-vai-tro']}));
  }

  canExit(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.entityRole
      && _.isEqual(this.formRole.value, this.initFormRole)
      && !this.checklistSelection.hasValue()) {
      return true;
    }

    const role = {
      name: this.formRole.value.name,
      permissions: this.checklistSelection.selected.filter(item => item.level === 1).map(item => {
        return {id: item.id};
      }).sort((a, b) => a.id - b.id)
    };

    const permissions = [...(this.entityRole?.permissions as any[] ?? [])];
    permissions.sort((a, b) => a.id - b.id);

    const isRedirect = _.isEqual({...this.entityRole, permissions}, {...this.entityRole, ...role});
    console.log({...this.entityRole, permissions});
    console.log({...this.entityRole, ...role});
    if (!isRedirect) {
      const dialogRef = this.dialog.open(DialogCanDeactivateComponent, {
        width: '20%'
      });
      return dialogRef.afterClosed().pipe(
        take(1),
        tap(result => {
          if (!result) {
            this.entityDetail$.next({...this.entityRole, ...role});
          }
        })
      );
    }
    return true;
  }

  ngOnDestroy(): void {
    this.entityDetail$.complete();
  }
}
