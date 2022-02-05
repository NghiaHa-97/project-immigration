import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {
  CreateEmployee,
  getArrayCityProvinceState,
  getArrayCommuneWardState,
  getArrayDepartmentState,
  getArrayDistrictState,
  getArrayPositionState,
  getArrayUnitTypeState,
  getArrayWorkUnitState, getEmployeeEntitiesState, Go,
  LoadCityProvince,
  LoadCommuneWardByDistrict,
  LoadDepartmentByWorkUnit,
  LoadDistrictByCityProvince,
  LoadPositionByDepartment,
  LoadUnitType,
  LoadWorkUnitByUnitType, UpdateEmployee
} from '../../store';
import * as moment from 'moment';

import {Observable, of} from 'rxjs';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import {getPrefixID} from '../../constans/prefix-id.const';
import {PATTERN_FORMAT_DATE} from '../../constans/pattern-format-date.const';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeUpdateComponent implements OnInit {
  formEmployee: FormGroup;
  formData: FormData = new FormData();
  entityEmployee: any;
  public cityProvince$!: Observable<any>;
  public district$!: Observable<any>;
  public communeWard$!: Observable<any>;

  public unitType$!: Observable<any>;
  public workUnit$!: Observable<any>;
  public department$!: Observable<any>;
  public position$!: Observable<any>;
  public entityUpdate$!: Observable<any>;
  private readonly initForm: any;

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>) {
    this.formEmployee = this.fb.group({
      code: [{value: '', disabled: true}],
      fullname: ['Dev Test'],
      avatar: [null],
      gender: [true],
      birthDay: [moment().format()],
      workUnitID: [null],
      departmentID: [null],
      positionID: [null],
      cityProvinceID: [null],
      districtID: [null],
      communeWardID: [null],
      description: ['description'],
      phoneNumber: ['phoneNumber'],
      numberIdentityCard: ['numberIdentityCard'],
      unitTypeID: [null]
      // createDate: [moment().format(PATTERN_FORMAT_DATE.DATETIME_REQUEST)]
    });
    this.initForm = this.formEmployee.value;
  }

  get formControlBirthDay(): FormControl {
    return this.formEmployee.get('birthDay') as FormControl;
  }

  get linkImage(): { name: string } {
    return {name: this.formEmployee.value.avatar};
  }


  ngOnInit(): void {
    this.entityUpdate$ = this.store.select(fromStore.getRouterParamsState).pipe(
      switchMap((data: any) => {
        if (data?.id) {
          return this.store.select(getEmployeeEntitiesState).pipe(
            map(entities => entities[getPrefixID(data?.id)]),
            tap(entity => {
              this.entityEmployee = entity;
              this.formEmployee.patchValue({...entity});
            })
          );
        }
        return of(null);
      }),
      map(entity => entity)
    );

    // console.log(moment(new Date()).format("DD/MM/YYYY"));
    this.store.dispatch(new LoadUnitType(null));
    this.store.dispatch(new LoadCityProvince(null));

    this.cityProvince$ = this.store.select(getArrayCityProvinceState);
    this.district$ = this.store.select(getArrayDistrictState);
    this.communeWard$ = this.store.select(getArrayCommuneWardState);

    this.unitType$ = this.store.select(getArrayUnitTypeState);
    this.workUnit$ = this.store.select(getArrayWorkUnitState);
    this.department$ = this.store.select(getArrayDepartmentState);
    this.position$ = this.store.select(getArrayPositionState);


    this.formEmployee.get('cityProvinceID')?.valueChanges.subscribe(val => this.store.dispatch(new LoadDistrictByCityProvince(val)));
    this.formEmployee.get('districtID')?.valueChanges.subscribe(val => this.store.dispatch(new LoadCommuneWardByDistrict(val)));

    this.formEmployee.get('unitTypeID')?.valueChanges.subscribe(val => this.store.dispatch(new LoadWorkUnitByUnitType(val)));
    this.formEmployee.get('workUnitID')?.valueChanges.subscribe(val => this.store.dispatch(new LoadDepartmentByWorkUnit(val)));
    this.formEmployee.get('departmentID')?.valueChanges.subscribe(val => this.store.dispatch(new LoadPositionByDepartment(val)));
  }


  onSubmit(): void {

    let value = this.formEmployee.value;
    value.birthDay = moment(value.birthDay).format(PATTERN_FORMAT_DATE.DATE_REQUEST);
    if (!!this.entityEmployee) {
      value = {...this.entityEmployee, ...value};
      value.createDate = moment(value.createDate).format(PATTERN_FORMAT_DATE.DATETIME_REQUEST);
      value.updateDate = moment(value.updateDate).format(PATTERN_FORMAT_DATE.DATETIME_REQUEST);
    }
    if (this.formData.has('employee')) {
      this.formData.set('employee', JSON.stringify(value));
    } else {
      this.formData.append('employee', JSON.stringify(value));
    }
    if (!!this.entityEmployee) {
      this.store.dispatch(new UpdateEmployee({form: this.formData, id: value.id}));
    } else {
      this.store.dispatch(new CreateEmployee(this.formData));
      // reset form
      this.store.select(fromStore.getEmployeeResponseStatusState).pipe(
        map(({status}) => status),
        filter(isNotNull => !!isNotNull),
        take(1)
      ).subscribe(status => {
        if (status === '200') {
          this.formEmployee.reset(this.initForm);
        }
      });
    }

    // console.log(moment(this.formEmployee.value.birthDay).format(PATTERN_FORMAT_DATE.DATETIME_REQUEST));
    // this.store.dispatch(new CreateEmployee(this.formData));
  }

  setFileImageControl(file: any): void {
    if (this.formData.has('file')) {
      this.formData.set('file', file);
    } else {
      this.formData.append('file', file);
    }
  }

  back(): void {
    this.store.dispatch(new Go({path: ['nhan-vien']}));
  }
}
