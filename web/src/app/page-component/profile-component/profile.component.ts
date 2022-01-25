import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {ColumnAndStyleModel} from '../../models/columns-and-styles.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {fromEvent, Observable} from 'rxjs';
import {TableComponent} from '../../common-component/table/table.component';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Go, LoadProfile} from '../../store';
import {map, withLatestFrom} from 'rxjs/operators';
import * as moment from 'moment';
import {PATTERN_FORMAT_DATE} from '../../constans/pattern-format-date.const';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, AfterViewInit{
  profiles$!: Observable<any[]>;

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
              private store: Store<fromStore.FeatureState>) {
    this.form = this.fb.group({
      selector: ['option2']
    });
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

    this.store.dispatch(new LoadProfile(null));
    this.profiles$ = this.store.select(fromStore.getArrayProfileState).pipe(
      map(dataArray => dataArray.map(element => {
        return {
          ...element,
          createDate: moment(element.createDate).format(PATTERN_FORMAT_DATE.DATETIME_RESPONSE),
          updateDate: element.updateDate ? moment(element.updateDate).format(PATTERN_FORMAT_DATE.DATETIME_RESPONSE) : null
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
      this.onNewProfile();
      console.log(x);
    });

    this.eventClickUpdate$.pipe(
      withLatestFrom(this.appTable.selectAction),
      map(([data1, data2]) => data2)
    ).subscribe(x => {
      this.onDetailProfile(x);
      console.log(x);
    });

    this.eventClickDelete$.pipe(
      withLatestFrom(this.appTable.selectAction),
      map(([data1, data2]) => `${data1}  ${data2}`)
    ).subscribe(x => console.log(x));
  }

  onNewProfile(): void {
    this.store.dispatch(new Go({path: ['ho-so', 'them-moi']}));
  }

  onDetailProfile(id: string): void {
    console.log('onDetailProfile', id);
    this.store.dispatch(new Go({path: ['ho-so', 'chi-tiet', id]}));
  }
}

export const COLUMNS_AND_STYLES: ColumnAndStyleModel[] = [
  {
    columnName: 'code',
    columnHeaderName: 'Mã',
    styleHeader: {width: '100px', minWidth: '100px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'projectMissionName',
    columnHeaderName: 'Tên nhiệm vụ',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'statusProfileName',
    columnHeaderName: 'Trạng thái hồ sơ',
    styleHeader: {width: '100px', minWidth: '100px'},
    isSort: true,
    styleBody: 'statusProfileID',
    isStatus: true
  },
  {
    columnName: 'workUnitName',
    columnHeaderName: 'Đơn vị công tác',
    styleHeader: {width: '200px', minWidth: '80px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'departmentName',
    columnHeaderName: 'Phòng ban làm việc',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'vehicleName',
    columnHeaderName: 'phương tiện vận chuyển',
    styleHeader: {width: '150px', minWidth: '150px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'quantityEmployee',
    columnHeaderName: 'Số lượng nhân viên',
    styleHeader: {width: '150px', minWidth: '150px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'quantityExperts',
    columnHeaderName: 'Số lượng chuyên gia',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'employeeCreateName',
    columnHeaderName: 'Nhân viên tạo',
    styleHeader: {minWidth: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  // {
  //   columnName: 'districtName',
  //   styleHeader: {width: '200px', minWidth: '200px'},
  //   isSort: true,
  //   styleBody: null,
  //   isStatus: false
  // },
  // {
  //   columnName: 'communeWardName',
  //   styleHeader: {width: '400px', minWidth: '200px'},
  //   isSort: false,
  //   styleBody: STATUS_COLOR_STYLE.RED,
  //   isStatus: true
  // },
  {
    columnName: 'approverName',
    columnHeaderName: 'Nhân viên gửi',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'unitCreateProfileName',
    columnHeaderName: 'Đơn vị tạo',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'expirationDate',
    columnHeaderName: 'Ngày hết hạn',
    styleHeader: {width: '180px'},
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
