import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import * as moment from 'moment';
import {filter, map, skip, switchMap, take, tap} from 'rxjs/operators';
import {
  CreateProfile,
  getArrayDepartmentState,
  getArrayStatusProfileState,
  getArrayVehicleState,
  getProfileEntitiesState,
  getStatusProfileLoadedState,
  getVehicleLoadedState,
  Go,
  LoadDepartmentByWorkUnit,
  LoadStatusProfile,
  LoadVehicle, UpdateProfile,
} from '../../store';
import {getPrefixID} from '../../constans/prefix-id.const';
import {PatternFormat} from '../../constans/pattern-format-date.const';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeComponent} from '../employee-component/employee.component';
import {ExpertsComponent} from '../experts-component/experts.component';
import {ProjectMissionComponent} from '../project-mission-component/project-mission.component';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileUpdateComponent implements OnInit {
  isCreate = true;
  formProfile: FormGroup;
  entityProfile: any = null;
  public statusProfile$!: Observable<any>;
  public vehicles$!: Observable<any>;
  public entityUpdate$!: Observable<any>;
  private readonly initForm: any;
  public readonly EMPLOYEE = 'EMPLOYEE';
  public readonly EXPERT = 'EXPERT';
  public readonly PROJECT_MISSION = 'PROJECT_MISSION';
  public department$!: Observable<any>;

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private patternFormat: PatternFormat,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) {
    this.formProfile = this.fb.group({
      code: [{value: null, disabled: true}],
      departmentID: [null],
      vehicleID: [null],
      description: [null]
    });
    this.initForm = this.formProfile.value;
  }

  get description(): FormControl {
    return this.formProfile.get('description') as FormControl;
  }

  get getProjectMissionName(): any {
    return this.entityProfile?.projectMission?.name ?? '';
  }

  get getProjectMissionUpdateDate(): any {
    if (!this.entityProfile?.projectMission?.isFormatDate) {
      return this.patternFormat.formatDatetimeToString(this.entityProfile?.projectMission?.updateDate);
    }
    return this.entityProfile?.projectMission?.updateDate;
  }

  get getProjectMissionCreateDate(): any {
    if (!this.entityProfile?.projectMission?.isFormatDate) {
      return this.patternFormat.formatDatetimeToString(this.entityProfile?.projectMission?.createDate);
    }
    return this.entityProfile?.projectMission?.createDate;
  }

  get getEmployeeCreate(): any {
    return this.entityProfile?.employeeCreate;
  }

  get getApprover(): any {
    return this.entityProfile?.approver;
  }

  get getEmployees(): any[] {
    return this.entityProfile?.employees ?? [];
  }

  set setEmployees(data: any[]) {
    if (!this.entityProfile) {
      this.entityProfile = {};
    }
    this.entityProfile.employees = data;
  }

  get getExperts(): any[] {
    return this.entityProfile?.expertsInProfileQueries ?? [];
  }

  set setExperts(data: any[]) {
    if (!this.entityProfile) {
      this.entityProfile = {};
    }
    this.entityProfile.expertsInProfileQueries = data;
  }

  get getWorkUnitName(): string {
    return this.entityProfile?.workUnit?.name ?? 'Không có đơn vị';
  }

  formatDateToString(date: any, isFormatDate?: any): string {
    if (!isFormatDate) {
      return this.patternFormat.formatDateToString(date) ?? '';
    }
    return date;
  }

  // get formControlBirthDay(): FormControl {
  //   return this.formExpert.get('birthDay') as FormControl;
  // }
  //
  // get formControlExpiryDate(): FormControl {
  //   return this.formExpert.get('expiryDate') as FormControl;
  // }
  //
  // get formControlDateOfEntry(): FormControl {
  //   return this.formExpert.get('dateOfEntry') as FormControl;
  // }

  ngOnInit(): void {
    this.department$ = this.store.select(getArrayDepartmentState);
    this.entityUpdate$ = this.store.select(fromStore.getRouterParamsState).pipe(
      switchMap((data: any) => {
        if (data?.id) {
          return this.store.select(getProfileEntitiesState).pipe(
            map(entities => entities[getPrefixID(data?.id)]),
            tap(entity => {
              this.entityProfile = {...entity};
              this.isCreate = false;
              const workUnitID = entity?.workUnit?.id;
              if (workUnitID) {
                this.store.dispatch(new LoadDepartmentByWorkUnit(workUnitID));
              }
              this.formProfile.patchValue({...entity});
            })
          );
        }
        return of(null);
      }),
      take(1)
    );
    this.store.select(getStatusProfileLoadedState)
      .pipe(take(1))
      .subscribe(isLoaded => {
        if (!isLoaded) {
          this.store.dispatch(new LoadStatusProfile(null));
        }
      });
    this.statusProfile$ = this.store.select(getArrayStatusProfileState);

    this.store.select(getVehicleLoadedState)
      .pipe(take(1))
      .subscribe(isLoaded => {
        if (!isLoaded) {
          this.store.dispatch(new LoadVehicle(null));
        }
      });
    this.vehicles$ = this.store.select(getArrayVehicleState);
  }


  onSubmit(): void {

    const value = this.formProfile.value;
    const dataRequest = {...this.entityProfile, ...value};
    console.log(dataRequest);
    if (!this.isCreate) {
      this.store.dispatch(new UpdateProfile(dataRequest));
    } else {
      this.store.dispatch(new CreateProfile(dataRequest));
      // reset form
      this.store.select(fromStore.getProfileResponseStatusState).pipe(
        skip(1),
        map((response) => response?.status),
        filter(isNotNull => !!isNotNull),
        take(1)
      ).subscribe(status => {
        if (status === '200') {
          // this.formProfile.reset(this.initForm);
        }
      });
    }
  }

  openDialog(type: string): void {

    switch (type) {
      case this.EMPLOYEE: {
        const dialogEmployeeRef = this.dialog.open(EmployeeComponent, {
          width: '60%',
          height: '75%',
          data: {
            isSelectMulti: true,
            itemSelected: this.entityProfile?.employees?.map((item: any) => item.id) ?? []
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
              const arrEmployees: any[] = [];
              const it = result.keys();
              let item = it.next();
              while (!item.done) {
                const value = result.get(item.value);
                if (value) {
                  arrEmployees.push({
                    id: value.id,
                    code: value.code,
                    fullname: value.fullname,
                    birthDay: value.birthDay,
                    department: {
                      name: value.departmentName
                    },
                    position: {
                      name: value.positionName
                    },
                    isFormatDate: true
                  });
                } else {
                  const i = this.getEmployees.find(v => v.id === item.value);
                  arrEmployees.push(i);
                }
                item = it.next();
              }
              this.setEmployees = arrEmployees;
              this.changeDetectorRef.detectChanges();
            }
          });
        break;
      }
      case this.EXPERT: {
        const dialogRoleRef = this.dialog.open(ExpertsComponent, {
          width: '60%',
          height: '75%',
          data: {
            isSelectMulti: true,
            itemSelected: this.entityProfile?.expertsInProfileQueries?.map((item: any) => item.expert.id) ?? []
          }
        });

        dialogRoleRef.afterClosed()
          .pipe(take(1))
          .subscribe((result: Map<number | string, any>) => {
            if (!!result) {
              if (result.size === 0) {
                this.removeValue(this.EXPERT);
                return;
              }
              const arrExperts: any[] = [];
              const it = result.keys();
              let item = it.next();
              while (!item.done) {
                const value = result.get(item.value);
                if (value) {
                  arrExperts.push({
                    expert: {
                      id: value.id,
                      code: value.code,
                      fullname: value.fullname,
                      birthDay: value.birthDay,
                      country: {
                        name: value.countryName
                      },
                      isFormatDate: true
                    }
                  });
                } else {
                  const i = this.getExperts.find(v => v.expert.id === item.value);
                  arrExperts.push(i);
                }
                item = it.next();
              }
              this.setExperts = arrExperts;
              this.changeDetectorRef.detectChanges();
            }
          });
        break;
      }

      case this.PROJECT_MISSION: {
        const dialogRoleRef = this.dialog.open(ProjectMissionComponent, {
          width: '60%',
          height: '75%',
          data: {
            isSelectMulti: false,
            itemSelected: this.entityProfile?.projectMission?.id ? [this.entityProfile?.projectMission?.id] : []
          }
        });

        dialogRoleRef.afterClosed()
          .pipe(take(1))
          .subscribe((result: Map<number | string, any>) => {
            if (!!result) {
              if (result.size === 0) {
                this.removeValue(this.PROJECT_MISSION);
                return;
              }
              const it = result.keys();
              let item = it.next();
              while (!item.done) {
                const value = result.get(item.value);
                if (value) {
                  this.entityProfile = this.entityProfile ?? {};
                  this.entityProfile.projectMission = {
                    id: value.id,
                    name: value.name,
                    createDate: value.createDate,
                    updateDate: value.updateDate,
                    isFormatDate: true
                  };
                }
                item = it.next();
              }
              this.changeDetectorRef.detectChanges();
            }
          });
        break;
      }
    }
  }

  back(): void {
    this.store.dispatch(new Go({path: ['ho-so']}));
  }

  private removeValue(type: string): void {
    switch (type) {
      case this.EMPLOYEE: {
        if (this.entityProfile?.employees) {
          this.setEmployees = [];
        }
        break;
      }
      case this.EXPERT: {
        if (this.entityProfile?.expertsInProfileQueries) {
          this.setExperts = [];
        }
        break;
      }
      case this.PROJECT_MISSION: {
        if (this.entityProfile?.projectMission) {
          this.entityProfile.projectMission = null;
        }
        break;
      }
    }
    this.changeDetectorRef.detectChanges();
  }
}
