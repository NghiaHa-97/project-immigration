import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {ColumnAndStyleModel} from '../../models/columns-and-styles.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {fromEvent, Observable} from 'rxjs';
import {TableComponent} from '../../common-component/table/table.component';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Go, LoadExperts} from '../../store';
import {map, withLatestFrom} from 'rxjs/operators';
import * as moment from 'moment';
import {PATTERN_FORMAT_DATE} from '../../constans/pattern-format-date.const';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss']
})
export class ExpertsComponent implements OnInit, AfterViewInit{
  experts$!: Observable<any[]>;

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

    this.store.dispatch(new LoadExperts(null));
    this.experts$ = this.store.select(fromStore.getArrayExpertsState).pipe(
      map(dataArray => dataArray.map(element => {
        return {
          ...element,
          createDate: moment(element.createDate).format(PATTERN_FORMAT_DATE.DATETIME_RESPONSE),
          updateDate: element.updateDate ? moment(element.updateDate).format(PATTERN_FORMAT_DATE.DATETIME_RESPONSE) : null,
          birthDay: element.birthDay ? moment(element.birthDay).format(PATTERN_FORMAT_DATE.DATE_RESPONSE) : null
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
      this.onNewExperts();
      console.log(x);
    });

    this.eventClickUpdate$.pipe(
      withLatestFrom(this.appTable.selectAction),
      map(([data1, data2]) => data2)
    ).subscribe(x => {
      this.onDetailExperts(x);
      console.log(x);
    });

    this.eventClickDelete$.pipe(
      withLatestFrom(this.appTable.selectAction),
      map(([data1, data2]) => `${data1}  ${data2}`)
    ).subscribe(x => console.log(x));
  }

  onNewExperts(): void {
    this.store.dispatch(new Go({path: ['chuyen-gia', 'them-moi']}));
  }

  onDetailExperts(id: string): void {
    console.log('onDetailExperts', id);
    this.store.dispatch(new Go({path: ['chuyen-gia', 'chi-tiet', id]}));
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
    columnName: 'fullname',
    columnHeaderName: 'Họ tên',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'gender',
    columnHeaderName: 'Giới tính',
    styleHeader: {width: '80px', minWidth: '80px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'birthDay',
    columnHeaderName: 'Ngày sinh',
    styleHeader: {width: '100px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'countryName',
    columnHeaderName: 'Quóc tịch',
    styleHeader: {width: '150px', minWidth: '150px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'religion',
    columnHeaderName: 'Tôn giáo',
    styleHeader: {width: '150px', minWidth: '150px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'occupation',
    columnHeaderName: 'Nghề nghiệp',
    styleHeader: {width: '150px', minWidth: '150px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'permanentResidentialAddress',
    columnHeaderName: 'địa chỉ thường chú',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'phoneNumber',
    columnHeaderName: 'Số điện thoại',
    styleHeader: {minWidth: '100px'},
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
    columnName: 'passportNumber',
    columnHeaderName: 'Số hộ chiếu',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'expiryDate',
    columnHeaderName: 'Ngày hết hạn',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'dateOfEntry',
    columnHeaderName: 'Ngày nhập cảnh',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'lengthOfStay',
    columnHeaderName: 'Thời gian lưu trú',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  // {
  //   columnName: 'passportImage',
  //   columnHeaderName: 'Ảnh hộ chiếu',
  //   styleHeader: {width: '180px'},
  //   isSort: true,
  //   styleBody: null,
  //   isStatus: false
  // },
  // {
  //   columnName: 'portraitPhotography',
  //   columnHeaderName: 'Ảnh chân dung',
  //   styleHeader: {width: '180px'},
  //   isSort: true,
  //   styleBody: null,
  //   isStatus: false
  // },
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
