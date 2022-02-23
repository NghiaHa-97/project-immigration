import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import * as moment from 'moment';
import {filter, map, skip, switchMap, take, tap} from 'rxjs/operators';
import {
  CreateExperts,
  getArrayCountryState,
  getCountryLoadedState, getExpertsEntitiesState,
  Go,
  LoadCountry,
  UpdateExperts
} from '../../store';
import {getPrefixID} from '../../constans/prefix-id.const';
import {PATTERN_FORMAT_DATE, PatternFormat} from '../../constans/pattern-format-date.const';
import {PermissionConst} from '../../constans/Permission.const';

@Component({
  selector: 'app-experts-update',
  templateUrl: './experts-update.component.html',
  styleUrls: ['./experts-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertsUpdateComponent implements OnInit {
  PermissionConst = PermissionConst;
  formExpert: FormGroup;
  formData: FormData = new FormData();
  entityExpert: any = null;
  public countries$!: Observable<any>;
  public entityUpdate$!: Observable<any>;
  private readonly initForm: any;
  public linkPortraitImage$ = new BehaviorSubject({name: ''});
  public linkPassportImage$ = new BehaviorSubject({name: ''});

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private patternFormat: PatternFormat) {
    this.formExpert = this.fb.group({
      code: [{value: null, disabled: true}],
      fullname: ['Dev Test'],
      gender: [true],
      birthDay: [moment().format()],
      countryID: [null],
      religion: [null],
      occupation: [null],
      permanentResidentialAddress: [null],
      phoneNumber: [null],
      passportNumber: [null],
      expiryDate: [moment().format()],
      dateOfEntry: [moment().format()],
      lengthOfStay: [null],
      passportImage: [null],
      portraitPhotography: [null]
    });
    this.initForm = this.formExpert.value;
  }

  get formControlBirthDay(): FormControl {
    return this.formExpert.get('birthDay') as FormControl;
  }

  get formControlExpiryDate(): FormControl {
    return this.formExpert.get('expiryDate') as FormControl;
  }

  get formControlDateOfEntry(): FormControl {
    return this.formExpert.get('dateOfEntry') as FormControl;
  }

  ngOnInit(): void {
    this.entityUpdate$ = this.store.select(fromStore.getRouterParamsState).pipe(
      switchMap((data: any) => {
        if (data?.id) {
          return this.store.select(getExpertsEntitiesState).pipe(
            map(entities => entities[getPrefixID(data?.id)]),
            tap(entity => {
              this.entityExpert = entity;
              this.linkPortraitImage$.next({name: this.entityExpert.portraitPhotography});
              this.linkPassportImage$.next({name: this.entityExpert.passportImage});
              this.formExpert.patchValue({...entity});
            })
          );
        }
        return of(null);
      }),
      map(entity => entity)
    );
    this.store.select(getCountryLoadedState)
      .pipe(take(1))
      .subscribe(isLoaded => {
        if (!isLoaded) {
          this.store.dispatch(new LoadCountry(null));
        }
      });
    this.countries$ = this.store.select(getArrayCountryState);
  }


  onSubmit(): void {

    let value = this.formExpert.value;
    value.birthDay = this.patternFormat.formatDateToDateRequest(value.birthDay);
    value.expiryDate = this.patternFormat.formatDateToDateRequest(value.expiryDate);
    value.dateOfEntry = this.patternFormat.formatDateToDateRequest(value.dateOfEntry);

    console.log(value);
    if (!!this.entityExpert) {
      value = {...this.entityExpert, ...value};
      value.createDate = this.patternFormat.formatDatetimeToDatetimeRequest(value.createDate);
      value.updateDate = this.patternFormat.formatDatetimeToDatetimeRequest(value.updateDate);
    }
    if (this.formData.has('expert')) {
      this.formData.set('expert', JSON.stringify(value));
    } else {
      this.formData.append('expert', JSON.stringify(value));
    }
    if (!!this.entityExpert) {
      this.store.dispatch(new UpdateExperts({form: this.formData, id: value.id}));
    } else {
      this.store.dispatch(new CreateExperts(this.formData));
      // reset form
      this.store.select(fromStore.getExpertsResponseStatusState).pipe(
        skip(1),
        map(({status}) => status),
        filter(isNotNull => !!isNotNull),
        take(1)
      ).subscribe(status => {
        if (status === '200') {
          this.formExpert.reset(this.initForm);
          this.linkPortraitImage$.next({name: ''});
          this.linkPassportImage$.next({name: ''});
        }
      });
    }

    // console.log(moment(this.formEmployee.value.birthDay).format(PATTERN_FORMAT_DATE.DATETIME_REQUEST));
    // this.store.dispatch(new CreateEmployee(this.formData));
  }

  setFilePassportImageControl(file: any): void {
    if (this.formData.has('passportImage')) {
      this.formData.set('passportImage', file);
    } else {
      this.formData.append('passportImage', file);
    }
  }

  setFilePortraitImageControl(file: any): void {
    if (this.formData.has('portraitPhotography')) {
      this.formData.set('portraitPhotography', file);
    } else {
      this.formData.append('portraitPhotography', file);
    }
  }

  back(): void {
    this.store.dispatch(new Go({path: ['chuyen-gia']}));
  }
}
