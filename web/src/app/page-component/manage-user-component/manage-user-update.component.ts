import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {
  Go,
  CreateManageUser, UpdateManageUser
} from '../../store';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {getPrefixID} from '../../constans/prefix-id.const';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeComponent} from '../employee-component/employee.component';
import {RoleComponent} from '../role-component/role.component';


@Component({
  selector: 'app-manage-user-update',
  templateUrl: './manage-user-update.component.html',
  styleUrls: ['./manage-user-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUserUpdateComponent implements OnInit {
  formUserCustomer: FormGroup;
  ROLE = 'role';
  EMPLOYEE = 'employee';

  public entity: any;
  public entityDetail$ = new BehaviorSubject<any>(null);
  public isDetail$!: Observable<boolean>;

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private dialog: MatDialog) {
    this.formUserCustomer = this.fb.group({
      username: ['', Validators.required],
      password: [''],
      isActive: [true],
      employeeFullName: [{value: '', disabled: true}],
      employeeCode: [{value: '', disabled: true}],
      roleName: [{value: '', disabled: true}],
      employeeID: [''],
      roleID: [0]
    });
  }


  ngOnInit(): void {
    this.store.select(fromStore.getRouterParamsState).pipe(
      switchMap((data: any) => {
        if (data?.id) {
          return this.store.select(fromStore.getManageUserEntitiesState).pipe(
            map(entities => entities[getPrefixID(data?.id)])
          );
        }
        return of(null);
      }),
      take(1)
      // map(entity => entity)
    ).subscribe(entity => {
      if (!!entity) {
        this.entity = entity;
        this.entityDetail$.next(entity);
      }
    });

    this.isDetail$ = this.entityDetail$.pipe(
      tap(entity => {
        if (!!entity) {
          this.formUserCustomer.patchValue({
            ...entity
          });
        }

      }),
      map(entity => !!entity)
    );
  }


  onSubmit(): void {
    if (this.formUserCustomer.valid) {
      const data = !!this.entity ? {...this.entity, ...this.formUserCustomer.value} : this.formUserCustomer.value;
      const {
        isDetail,
        employeeFullName,
        employeeCode,
        roleName,
        ...user
      } = data;
      if (!!this.entity) {

        console.log(user);
        this.store.dispatch(new UpdateManageUser(user));
        return;
      }
      this.store.dispatch(new CreateManageUser(user));
    }

  }

  autoGenPass(): void {
    const password = Math.random().toString(36).substr(2, 8);
    this.formUserCustomer.patchValue({password});
  }

  openDialog(type: string): void {

    switch (type) {
      case this.EMPLOYEE:
        const dialogEmployeeRef = this.dialog.open(EmployeeComponent, {
          width: '60%',
          height: '75%',
          data: {
            isSelectMulti: false,
            itemSelected: this.formUserCustomer.value.employeeID === '' ? [] : [this.formUserCustomer.value.employeeID]
          }
        });

        dialogEmployeeRef.afterClosed()
          .pipe(take(1))
          .subscribe((result: Map<number | string, any>) => {
            if (!!result) {
              if (result.size === 0) {
                this.removeValue(this.EMPLOYEE);
                return;
              }
              const it = result.values();
              let item = it.next();
              while (!item.done) {
                this.formUserCustomer.patchValue({
                  employeeCode: item.value.code,
                  employeeFullName: item.value.fullname,
                  employeeID: item.value.id
                });
                item = it.next();
              }
            }
          });
        break;
      case this.ROLE:
        const dialogRoleRef = this.dialog.open(RoleComponent, {
          width: '60%',
          height: '75%',
          data: {
            isSelectMulti: false,
            itemSelected: this.formUserCustomer.value.roleID === 0 ? [] : [this.formUserCustomer.value.roleID]
          }
        });

        dialogRoleRef.afterClosed()
          .pipe(take(1))
          .subscribe((result: Map<number | string, any>) => {
            if (!!result) {
              if (result.size === 0) {
                this.removeValue(this.ROLE);
                return;
              }
              const it = result.values();
              let item = it.next();
              while (!item.done) {
                this.formUserCustomer.patchValue({
                  roleName: item.value.name,
                  roleID: item.value.id
                });
                item = it.next();
              }
            }
          });
        break;
    }

  }

  removeValue(type: string): void {
    switch (type) {
      case this.EMPLOYEE:
        this.formUserCustomer.patchValue({
          employeeFullName: [''],
          employeeCode: [''],
          employeeID: ['']
        });
        break;
      case this.ROLE:
        this.formUserCustomer.patchValue({
          roleName: [''],
          roleID: [0]
        });
        break;
    }
  }

  back(): void {
    this.store.dispatch(new Go({path: ['quan-ly-nguoi-dung']}));
  }
}
