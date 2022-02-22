import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import * as _ from 'lodash';

import {filter, map, skip, switchMap, take, tap} from 'rxjs/operators';
import {
  CreateAssignTasks,
  getArrayDepartmentState, getUserDetailState,
  Go, LoadDepartmentByWorkUnit, UpdateAssignTasks,
} from '../../store';
import {getPrefixID} from '../../constans/prefix-id.const';

import {MatDialog} from '@angular/material/dialog';
import {EmployeeComponent} from '../employee-component/employee.component';
import {ProfileComponent} from '../profile-component/profile.component';
import {PATTERN_FORMAT_DATE, PatternFormat} from '../../constans/pattern-format-date.const';
import * as moment from 'moment';


@Component({
  selector: 'app-assign-tasks-update',
  templateUrl: './assign-tasks-update.component.html',
  styleUrls: [],
  // styleUrls: ['./assign-tasks-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignTasksUpdateComponent implements OnInit, OnDestroy {
  public readonly EMPLOYEE = 'EMPLOYEE';
  public readonly PROFILE = 'PROFILE';
  @ViewChild('dialogUpdate', {
    static: true
  }) dialogUpdate!: TemplateRef<any>;
  formTask: FormGroup;
  initForm: any;
  entityDetail$ = new BehaviorSubject<any>(null);
  isDetail$!: Observable<boolean>;
  entityTask: any;
  department$!: Observable<any[]>;

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private patterFormat: PatternFormat,
              private dialog: MatDialog) {
    this.formTask = this.fb.group({
      title: ['', Validators.required],
      employeeID: [''],
      employeeCode: [''],
      employeeFullName: [''],
      profileID: [''],
      profileCode: [''],
      expirationDate: this.fb.group({
        date: [null],
        time: [null]
      }),
      description: [''],
      result: [''],
      departmentID: [null],
      isEmployee: [true]
    });
    this.initForm = this.formTask.value;

  }

  get description(): FormControl {
    return this.formTask.get('description') as FormControl;
  }

  get expirationDateDate(): FormControl {
    return this.formTask.get('expirationDate.date') as FormControl;
  }

  get expirationDateTime(): FormControl {
    return this.formTask.get('expirationDate.time') as FormControl;
  }

  get resultReport(): FormControl {
    return this.formTask.get('result') as FormControl;
  }

  ngOnInit(): void {
    this.department$ = this.store.select(getArrayDepartmentState);
    this.store.select(getUserDetailState).subscribe(user => {
      if (user?.principal?.workUnitID) {
        this.store.dispatch(new LoadDepartmentByWorkUnit(user?.principal?.workUnitID));
      }
    });
    this.store.select(fromStore.getRouterParamsState).pipe(
      switchMap((data: any) => {
        if (data?.id) {
          return this.store.select(fromStore.getAssignTasksEntitiesState).pipe(
            map(entities => entities[getPrefixID(data?.id)])
          );
        }
        return of(null);
      }),
      take(1)
      // map(entity => entity)
    ).subscribe(entity => {
      if (!!entity) {
        this.entityTask = entity;
        this.entityDetail$.next(entity);
      }
    });

    this.isDetail$ = this.entityDetail$.pipe(
      tap(entity => {
        console.log(this.patterFormat.splitDateTimeResponseToDateAndTime(entity.expirationDate));
        this.formTask.patchValue({
          ...entity,
          expirationDate: this.patterFormat.splitDateTimeResponseToDateAndTime(entity.expirationDate)
        });
      }),
      map(entity => !!entity)
    );
    // this.store.dispatch((new LoadDetailRole(1)));
    // this.permissionsDetail$ = this.store.select(fromStore.getRoleEntitiesState)
    //   .pipe(map(entities =>
    //     entities[getPrefixID(1)]?.permissionRoles?.map((item: any) => item.permissionID) ?? [])
    //   );
  }


  onSubmit(): void {
    console.log(this.formTask);
    if (this.formTask.valid) {
      if (!!this.entityTask) {
        // update
        console.log('update');
        const data = {
          ...this.entityTask,
          ...this.formTask.value,
          expirationDate: this.patterFormat
            .combineDateAndTimeToDateTimeRequest(
              this.formTask.value?.expirationDate?.date,
              this.formTask.value?.expirationDate?.time
            )
        };
        console.log(data);
        const dialogRef = this.dialog.open(this.dialogUpdate, {
          width: '20%'
        });
        dialogRef.afterClosed()
          .pipe(take(1))
          .subscribe(result => {
            if (result) {
              this.store.dispatch(
                new UpdateAssignTasks(data));
            }
          });
      } else {
        // create
        // console.log('create', {...this.formProjectMission.value});
        const data = {
          ...this.formTask.value,
          expirationDate: this.patterFormat
            .combineDateAndTimeToDateTimeRequest(
              this.formTask.value?.expirationDate?.date,
              this.formTask.value?.expirationDate?.time
            )
        };
        console.log(data);
        this.store.dispatch(new CreateAssignTasks(data));
        this.store.select(fromStore.getAssignTasksResponseStatusState).pipe(
          skip(1),
          map((status) => status?.status),
          filter(isNotNull => !!isNotNull),
          take(1)
        ).subscribe(status => {
          console.log(status);
          if (status === '200') {
            this.formTask.reset(this.initForm);
          }
        });
      }
    }
  }

  openDialog(type: string): void {

    switch (type) {
      case this.EMPLOYEE: {
        const dialogEmployeeRef = this.dialog.open(EmployeeComponent, {
          width: '60%',
          height: '75%',
          data: {
            isSelectMulti: false,
            itemSelected: this.formTask.value.employeeID === '' ? [] : [this.formTask.value.employeeID]
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
                this.formTask.patchValue({
                  employeeCode: item.value.code,
                  employeeFullName: item.value.fullname,
                  employeeID: item.value.id
                });
                item = it.next();
              }
            }
          });
        break;
      }

      case this.PROFILE: {
        const dialogRoleRef = this.dialog.open(ProfileComponent, {
          width: '60%',
          height: '75%',
          data: {
            isSelectMulti: false,
            itemSelected: this.formTask.value.profileID ? [] : [this.formTask.value.profileID]
          }
        });

        dialogRoleRef.afterClosed()
          .pipe(take(1))
          .subscribe((result: Map<number | string, any>) => {
            if (!!result) {
              if (result.size === 0) {
                this.removeValue(this.PROFILE);
                return;
              }
              const it = result.values();
              let item = it.next();
              while (!item.done) {
                this.formTask.patchValue({
                  profileCode: item.value.code,
                  profileID: item.value.id
                });
                item = it.next();
              }
            }
          });
        break;
      }
    }
  }

  removeValue(type: string): void {
    switch (type) {
      case this.EMPLOYEE: {
        this.formTask.patchValue({
          employeeFullName: [''],
          employeeCode: [''],
          employeeID: ['']
        });
        break;
      }
      case this.PROFILE: {
        this.formTask.patchValue({
          profileCode: [''],
          profileID: ['']
        });
        break;
      }
    }
  }


  back(): void {
    this.store.dispatch(new Go({path: ['nhiem-vu']}));
  }

  ngOnDestroy(): void {
    this.entityDetail$.complete();
  }
}
