import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {CreateEmployee} from '../../store';
import * as moment from 'moment';
import {PATTERN_FORMAT_DATE} from '../../constans/pattern-format-date.const';


@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  formEmployee: FormGroup;
  formData: FormData = new FormData();

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>) {
    this.formEmployee = this.fb.group({
      avatar: [null],
      birthDay: [null],
      fullname: ['Hà Duy Nghĩa'],
      createDate: [moment().format(PATTERN_FORMAT_DATE.DATETIME_REQUEST)]
    });
  }

  get formControlBirthDay(): FormControl {
    return this.formEmployee.get('birthDay') as FormControl;
  }

  get linkImage(): string {
    return this.formEmployee.value.avatar;
  }

  ngOnInit(): void {

  }


  onSubmit(): void {

    const value = this.formEmployee.value;
    value.birthDay = moment(this.formEmployee.value.birthDay).format(PATTERN_FORMAT_DATE.DATE_REQUEST);
    console.log(value);
    if (this.formData.has('employee')) {
      this.formData.set('employee', JSON.stringify(value));
    } else {
      this.formData.append('employee', JSON.stringify(value));
    }

    // console.log(moment(this.formEmployee.value.birthDay).format(PATTERN_FORMAT_DATE.DATETIME_REQUEST));
    this.store.dispatch(new CreateEmployee(this.formData));
  }

  setFileImageControl(file: any): void {
    if (this.formData.has('file')) {
      this.formData.set('file', file);
    }else{
      this.formData.append('file', file);
    }
  }


}
