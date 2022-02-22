import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
  getStatusProfileLoadedState, getUserDetailState,
  getVehicleLoadedState,
  Go,
  LoadDepartmentByWorkUnit, LoadObjectType,
  LoadStatusProfile,
  LoadVehicle, UpdateProfile, UpdateProfileStatus,
} from '../../store';
import {getPrefixID} from '../../constans/prefix-id.const';
import {PatternFormat} from '../../constans/pattern-format-date.const';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeComponent} from '../employee-component/employee.component';
import {ExpertsComponent} from '../experts-component/experts.component';
import {ProjectMissionComponent} from '../project-mission-component/project-mission.component';
import {PositionAndLocation} from '../../models/PositionAndLocation.model';
import {MapComponent} from '../map-component/map.component';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileUpdateComponent implements OnInit {
  public readonly HUY = 2;
  public readonly CHUYEN_LEN_BO = 3;
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
  private mapPositionAndLocation = new Map<string, PositionAndLocation>();

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private patternFormat: PatternFormat,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) {
    this.formProfile = this.fb.group({
      code: [{value: null, disabled: true}],
      departmentID: [null],
      vehicleID: [null],
      description: [null],
      positionAndLocation: this.fb.array([])
    });
    this.initForm = this.formProfile.value;
    this.store.dispatch(new LoadObjectType(null));
  }

  createPositionAndLocation(payload: PositionAndLocation | undefined): FormGroup {
    return this.fb.group({
      ...payload,
      location: [{value: payload?.location, disabled: true}]
    });
  }

  addPositionAndLocation(payload: PositionAndLocation | undefined): void {
    const control = this.positionAndLocation;
    control.push(this.createPositionAndLocation(payload));
  }

  get positionAndLocation(): FormArray {
    return this.formProfile.get('positionAndLocation') as FormArray;
  }

  initPositionAndLocation(payload: any): void {
    const entities = payload?.expertsInProfileQueries;
    entities?.forEach((data: any) => {
      this.addPositionAndLocation({
        location: data?.location?.name,
        locationID: data?.location?.id,
        position: data?.position,
        expertID: data?.expert?.id
      });
    });
  }

  saveMap(): void {
    this.positionAndLocation.value.forEach((data: PositionAndLocation) => {
      if (data?.expertID) {
        this.mapPositionAndLocation.set(data.expertID, data);
      }
    });
  }

  setControl(id: string): void {
    if (this.mapPositionAndLocation.has(id)) {
      this.addPositionAndLocation(this.mapPositionAndLocation.get(id));
    } else {
      this.addPositionAndLocation({
        location: null,
        locationID: null,
        position: null,
        expertID: id
      });
    }
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
              this.initPositionAndLocation(this.entityProfile);
              this.isCreate = false;
              const workUnitID = entity?.workUnit?.id;
              if (workUnitID) {
                this.store.dispatch(new LoadDepartmentByWorkUnit(workUnitID));
              }
              this.formProfile.patchValue({...entity});
            })
          );
        } else {
          this.store.select(getUserDetailState)
            .pipe(
              map(entity => entity?.principal?.workUnitID),
              filter(e => e),
              take(1)
            )
            .subscribe((id: any) => {
              console.log('1111111111111111111111');
              if (id) {
                this.store.dispatch(new LoadDepartmentByWorkUnit(id));
              }
            });
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
    this.saveMap();
    dataRequest.expertsInProfileQueries = dataRequest?.expertsInProfileQueries?.map((data: any) => {
      return {
        ...data,
        location: {id: this.mapPositionAndLocation.get(data.expert.id)?.locationID},
        position: this.mapPositionAndLocation.get(data.expert.id)?.position
      };
    });
    this.mapPositionAndLocation.clear();
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
          .subscribe((result: Map<string, any>) => {
            if (!!result) {
              this.saveMap();
              this.positionAndLocation.clear();
              if (result.size === 0) {
                this.removeValue(this.EXPERT);
                this.mapPositionAndLocation.clear();
                return;
              }
              const arrExperts: any[] = [];
              const it = result.keys();
              let item = it.next();
              while (!item.done) {
                const value = result.get(item.value);
                this.setControl(item.value);
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
              this.mapPositionAndLocation.clear();
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

  openDialogMap(i: number, id: string | null): void {
    const dialogRoleRef = this.dialog.open(MapComponent, {
      width: '80%',
      height: '80%',
      data: {
        locationID: this.positionAndLocation.get(`${i}`)?.get('locationID')?.value
      }
    });

    dialogRoleRef.afterClosed()
      .pipe(take(1))
      .subscribe((result: any) => {
        if (result?.locationID) {
          this.positionAndLocation.get(`${i}`)?.patchValue({...result});
        }
      });
  }

  changeStatus(type: number): void {
    switch (type) {
      case this.HUY:
        this.store.dispatch(new UpdateProfileStatus({
          id: this.HUY,
          profileID: this.entityProfile?.id
        }));
        break;
      case this.CHUYEN_LEN_BO:
        this.store.dispatch(new UpdateProfileStatus({
          id: this.CHUYEN_LEN_BO,
          profileID: this.entityProfile?.id
        }));
        break;
    }
  }
}
