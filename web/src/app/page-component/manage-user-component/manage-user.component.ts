import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {ColumnAndStyleModel} from '../../models/columns-and-styles.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Go, LoadEmployee, LoadManageUser} from '../../store';
import {fromEvent, Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import * as moment from 'moment';
import {TableComponent} from '../../common-component/table/table.component';
import {PATTERN_FORMAT_DATE, PatternFormat} from '../../constans/pattern-format-date.const';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EmployeeUpdateComponent} from '../employee-component/employee-update.component';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUserComponent implements OnInit, AfterViewInit {
  usersCustomer$!: Observable<any[]>;

  public chosenDate = Date.now();
  @ViewChild('appTable') appTable!: TableComponent;
  @ViewChild('btnDetail', {
    static: true,
    read: ElementRef
  }) btnDetail!: ElementRef;

  @ViewChild('btnUpdate', {
    static: true,
    read: ElementRef
  }) btnUpdate!: ElementRef;

  @ViewChild('btnDelete', {
    static: true,
    read: ElementRef
  }) btnDelete!: ElementRef;

  eventClickDetails$!: Observable<any>;
  eventClickUpdate$!: Observable<any>;
  eventClickDelete$!: Observable<any>;

  @ViewChild('sort') sort!: MatSort;

  selection = new SelectionModel<any>(true, []);
  columnsAndStyles = COLUMNS_AND_STYLES;

  form!: FormGroup;
  public data!: any[];

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private patternFormat: PatternFormat,
              public dialog: MatDialog) {
    this.form = this.fb.group({
      selector: ['option2'],
      time: [moment().format('HH:mm')],
      date: [moment().format()]
    });
  }
  get formControlDate(): FormControl {
    return this.form.get('date') as FormControl;
  }

  get valueSelector() {
    return {
      image: 'assets/images/users/1.jpg',
      value: this.form.get('selector')?.value + 'Lua'
    };
  }

  ngOnInit(): void {
    // const emptyObject: { [property: string]: any } = {};
    // this.columnsAndStyles.map(val => val.columnName).reduce((obj, name) => {
    //   obj[name] = null;
    //   return {obj};
    // }, emptyObject);
    // console.log(emptyObject);

    this.store.dispatch(new LoadManageUser(null));
    this.usersCustomer$ = this.store.select(fromStore.getArrayManageUserState).pipe(
      map(dataArray => dataArray.map(element => {
        return {
          ...element,
          createDate: element.createDate ? moment(element.createDate).format(PATTERN_FORMAT_DATE.DATETIME_RESPONSE) : null,
          updateDate: element.updateDate ? moment(element.updateDate).format(PATTERN_FORMAT_DATE.DATETIME_RESPONSE) : null,
        };
      })),
      // map(x => {
      //   x.push(Object.create(null));
      //   x.push(Object.create(null));
      //   x.push(Object.create(null));
      //   x.push(Object.create(null));
      //   x.push(Object.create(null));
      //   return x;
      // })
    );
  }

  handlerChangePage(event: PageEvent): void {
    console.log('PageEvent', event);
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    console.log(this.sort);
    this.sort.sortChange.subscribe(x => console.log(x));


    this.eventClickDetails$ = fromEvent(this.btnDetail.nativeElement, 'click').pipe(map(e => 'detail'));
    this.eventClickUpdate$ = fromEvent(this.btnUpdate.nativeElement, 'click').pipe(map(e => 'update'));
    this.eventClickDelete$ = fromEvent(this.btnDelete.nativeElement, 'click').pipe(map(e => 'delete'));
    // this.buttonDetails$.subscribe(e => console.log(e));

    // zip(this.buttonDetails$, this.appTable.onAction).subscribe(val => console.log(val));

    this.eventClickDetails$.pipe(
      withLatestFrom(this.appTable.selectAction),
      map(([data1, data2]) => `${data1}  ${data2}`)
    ).subscribe(x => {
      this.onNewEmployee();
      console.log(x);
    });

    this.eventClickUpdate$.pipe(
      withLatestFrom(this.appTable.selectAction),
      map(([data1, data2]) => data2)
    ).subscribe(x => {
      this.onDetailEmployee(x);
      console.log(x);
    });

    this.eventClickDelete$.pipe(
      withLatestFrom(this.appTable.selectAction),
      map(([data1, data2]) => `${data1}  ${data2}`)
    ).subscribe(x => console.log(x));
  }

  onNewEmployee(): void {
    this.store.dispatch(new Go({path: ['quan-ly-nguoi-dung', 'them-moi']}));
  }

  onDetailEmployee(id: string): void {
    console.log('manage-user-detail', id);
    this.store.dispatch(new Go({path: ['quan-ly-nguoi-dung', 'chi-tiet', id]}));
  }

  handlerSearch(): void {
    const dialogRef = this.dialog.open(EmployeeUpdateComponent, {
      width: '1000px',
    });
    // console.log(this.form.value);
    // console.log(moment(this.form.value.date).format(PATTERN_FORMAT_DATE.DATETIME_REQUEST));
    // console.log(moment(this.form.value.time, PATTERN_FORMAT_DATE.TIME).format(PATTERN_FORMAT_DATE.TIME_SECONDS));
    console.log(this.patternFormat.combineDateAndTimeToDateTimeRequest(this.form.value.date, this.form.value.time));
    console.log(this.patternFormat.splitDateTimeResponseToDateAndTime(this.form.value.date));
  }
}

export const COLUMNS_AND_STYLES: ColumnAndStyleModel[] = [
  {
    columnName: 'username',
    columnHeaderName: 'Tên đăng nhập',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'isActive',
    columnHeaderName: 'Trạng thái',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'employeeCode',
    columnHeaderName: 'Mã nhân viên',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: false,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'employeeFullName',
    columnHeaderName: 'Tên đầy đủ',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'roleName',
    columnHeaderName: 'Vai trò',
    styleHeader: {width: '100px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'createDate',
    columnHeaderName: 'Ngày tạo',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'updateDate',
    columnHeaderName: 'Ngày sửa đổi',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  }
];
