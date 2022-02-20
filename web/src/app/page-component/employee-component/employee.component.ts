import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit, TemplateRef,
  ViewChild
} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {ColumnAndStyleModel} from '../../models/columns-and-styles.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Go, LoadEmployee, RemoveEmployee} from '../../store';
import {fromEvent, Observable} from 'rxjs';
import {map, take, withLatestFrom} from 'rxjs/operators';
import * as moment from 'moment';
import {TableComponent} from '../../common-component/table/table.component';
import {PatternFormat} from '../../constans/pattern-format-date.const';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import * as _ from 'lodash';
import {getPrefixID} from '../../constans/prefix-id.const';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  isDialog = false;
  params: any = {};
  employees$!: Observable<any[]>;
  nameEmployeeDel$!: Observable<string>;
  totalItems$!: Observable<number>;
  @ViewChild('dialogDelete', {
    static: true
  }) dialogDelete!: TemplateRef<any>;
  @ViewChild('appTable') appTable!: TableComponent;

  @ViewChild('btnDetail', {
    static: false,
    read: ElementRef
  }) set btnDetail(btn: ElementRef) {
    if (btn?.nativeElement) {
      this.eventClickDetails$ = fromEvent(btn?.nativeElement, 'click')
        .pipe(map(e => 'detail'));
      this.eventClickDetails$.pipe(
        withLatestFrom(this.appTable.selectAction),
        map(([data1, data2]) => data2)
      ).subscribe(x => {
        this.onDetailEmployee(x);
      });
    }
  }

  // @ViewChild('btnUpdate', {
  //   static: false,
  //   read: ElementRef
  // }) btnUpdate!: ElementRef;

  @ViewChild('btnDelete', {
    static: false,
    read: ElementRef
  }) set btnDelete(btn: ElementRef) {
    if (btn?.nativeElement) {
      this.eventClickDelete$ = fromEvent(btn?.nativeElement, 'click')
        .pipe(map(e => 'delete'));
      this.eventClickDelete$.pipe(
        withLatestFrom(this.appTable.selectAction),
        map(([data1, data2]) => data2)
      ).subscribe(x => {
        this.nameEmployeeDel$ = this.store.select(fromStore.getEmployeeEntitiesState)
          .pipe(
            map(entities => entities[getPrefixID(x)]?.fullname ?? '')
          );
        const dialogRef = this.dialog.open(this.dialogDelete, {
          width: '20%'
        });
        dialogRef.afterClosed().pipe(take(1))
          .subscribe(result => {
            if (result) {
              this.onDeleteEmployee(x);
            }
          });
      });
    }
  }

  eventClickDetails$!: Observable<any>;
  // eventClickUpdate$!: Observable<any>;
  eventClickDelete$!: Observable<any>;

  @ViewChild('sort') sort!: MatSort;

  selection!: SelectionModel<number | string>;
  columnsAndStyles = COLUMNS_AND_STYLES;

  formSearch!: FormGroup;
  public data!: any[];

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private patternFormat: PatternFormat,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    this.isDialog = !_.isEmpty(dataDialog);
    if (this.isDialog) {
      this.selection = new SelectionModel<number | string>(dataDialog.isSelectMulti, dataDialog.itemSelected);
    }
    this.formSearch = this.fb.group({
      code: [''],
      fullname: [''],
      workUnitName: [''],
      cityProvinceName: [''],
      phoneNumber: [''],
      numberIdentityCard: ['']
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadEmployee(null));
    this.employees$ = this.store.select(fromStore.getArrayEmployeeState).pipe(
      map(dataArray => dataArray.map(element => {
        return {
          ...element,
          createDate: this.patternFormat.formatDatetimeToString(element.createDate),
          updateDate: this.patternFormat.formatDatetimeToString(element.updateDate),
          birthDay: this.patternFormat.formatDateToString(element.birthDay),
          gender: element.gender ? 'Nam' : 'Nữ'
        };
      })),
    );

    this.totalItems$ = this.store.select(fromStore.getEmployeeResponseStatusState).pipe(
      map(data => data?.totalElements ?? 0)
    );
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // console.log(this.sort);
    this.sort.sortChange.subscribe(x => {
      this.params = {
        ...this.params,
        sort: x.direction === '' ? null : [`${x.active},${x.direction}`]
      };
      this.store.dispatch(new LoadEmployee(this.params));
    });
  }

  onNewEmployee(): void {
    this.store.dispatch(new Go({path: ['nhan-vien', 'them-moi']}));
  }

  onDetailEmployee(id: string): void {
    this.store.dispatch(new Go({path: ['nhan-vien', 'chi-tiet', id]}));
  }

  onDeleteEmployee(id: string): void {
    this.store.dispatch(new RemoveEmployee(id));
  }

  handlerChangePage(event: PageEvent): void {
    this.params = {
      ...this.params,
      page: event.pageIndex + 1,
      size: event.pageSize
    };
    this.store.dispatch(new LoadEmployee(this.params));
  }

  handlerSearch(): void {
    this.params = {
      ...this.params,
      page: 1,
      ...this.formSearch.value
    };
    this.store.dispatch(new LoadEmployee(this.params));
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
  // {
  //   columnName: 'avatar',
  //   columnHeaderName: 'Ảnh',
  //   styleHeader: {width: '60px', minWidth: '60px'},
  //   isSort: false,
  //   styleBody: null,
  //   isStatus: false
  // },
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
    columnName: 'departmentName',
    columnHeaderName: 'Phòng ban',
    styleHeader: {width: '150px', minWidth: '150px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'positionName',
    columnHeaderName: 'Chức vụ',
    styleHeader: {width: '150px', minWidth: '150px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'workUnitName',
    columnHeaderName: 'Đơn vị',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'cityProvinceName',
    columnHeaderName: 'Quê quán',
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
    columnName: 'phoneNumber',
    columnHeaderName: 'Điện thoại',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'numberIdentityCard',
    columnHeaderName: 'Căn cước công dân',
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
