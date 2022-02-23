import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {ColumnAndStyleModel} from '../../models/columns-and-styles.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Go, LoadManageUser, RemoveManageUser} from '../../store';
import {fromEvent, Observable} from 'rxjs';
import {map, take, withLatestFrom} from 'rxjs/operators';
import * as moment from 'moment';
import {TableComponent} from '../../common-component/table/table.component';
import {PatternFormat} from '../../constans/pattern-format-date.const';
import {MatDialog} from '@angular/material/dialog';
import {getPrefixID} from '../../constans/prefix-id.const';
import {PermissionConst} from '../../constans/Permission.const';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUserComponent implements OnInit, AfterViewInit {
  PermissionConst = PermissionConst;
  usersCustomer$!: Observable<any[]>;
  params: any = {};
  usernameDialog$!: Observable<string>;
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
      this.eventClickDetails$ = fromEvent(btn?.nativeElement, 'click').pipe(map(e => 'detail'));
      this.eventClickDetails$.pipe(
        withLatestFrom(this.appTable.selectAction),
        map(([_, data2]) => data2)
      ).subscribe(x => {
        this.onDetailUser(x);
      });
    }
  }

  // @ViewChild('btnUpdate', {
  //   static: true,
  //   read: ElementRef
  // }) btnUpdate!: ElementRef;

  @ViewChild('btnDelete', {
    static: false,
    read: ElementRef
  }) set btnDelete(btn: ElementRef) {
    if (btn?.nativeElement) {
      this.eventClickDelete$ = fromEvent(btn?.nativeElement, 'click').pipe(map(e => 'delete'));
      this.eventClickDelete$.pipe(
        withLatestFrom(this.appTable.selectAction),
        map(([_, data2]) => data2)
      ).subscribe((x: number) => {
        this.usernameDialog$ = this.store.select(fromStore.getManageUserEntitiesState).pipe(
          map(entities => entities[getPrefixID(x)]?.username ?? '')
        );
        const dialogRef = this.dialog.open(this.dialogDelete, {
          width: '20%'
        });
        dialogRef.afterClosed()
          .pipe(take(1))
          .subscribe(result => {
            if (result) {
              this.onDeleteUser(x);
            }
          });
      });
    }
  }

  eventClickDetails$!: Observable<any>;
  // eventClickUpdate$!: Observable<any>;
  eventClickDelete$!: Observable<any>;

  @ViewChild('sort') sort!: MatSort;

  selection = new SelectionModel<any>(true, []);
  columnsAndStyles = COLUMNS_AND_STYLES;

  formSearch!: FormGroup;
  public data!: any[];

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private patternFormat: PatternFormat,
              public dialog: MatDialog) {
    this.formSearch = this.fb.group({
      username: [''],
      employeeCode: [''],
      employeeFullName: [''],
      roleName: ['']
    });
  }

  ngOnInit(): void {

    this.store.dispatch(new LoadManageUser(null));
    this.usersCustomer$ = this.store.select(fromStore.getArrayManageUserState).pipe(
      map(dataArray => dataArray.map(element => {
        return {
          ...element,
          createDate: this.patternFormat.formatDatetimeToString(element.createDate),
          updateDate: this.patternFormat.formatDatetimeToString(element.updateDate)
        };
      })),
    );

    this.totalItems$ = this.store.select(fromStore.getManageUserResponseStatusState).pipe(
      map(data => data?.totalElements ?? 0)
    );
  }

  ngAfterViewInit(): void {

    // console.log(this.sort);
    this.sort.sortChange.subscribe(x => {
      this.params = {
        ...this.params,
        sort: x.direction === '' ? null : [`${x.active},${x.direction}`]
      };
      // console.log(this.params);
      this.store.dispatch(new LoadManageUser(this.params));
    });

    // this.eventClickUpdate$ = fromEvent(this.btnUpdate.nativeElement, 'click').pipe(map(e => 'update'));
    // this.eventClickUpdate$.pipe(
    //   withLatestFrom(this.appTable.selectAction),
    //   map(([data1, data2]) => data2)
    // ).subscribe(x => {
    //
    //   console.log(x);
    // });
  }

  onNewUser(): void {
    this.store.dispatch(new Go({path: ['quan-ly-nguoi-dung', 'them-moi']}));
  }

  onDetailUser(id: string): void {
    console.log('manage-user-detail', id);
    this.store.dispatch(new Go({path: ['quan-ly-nguoi-dung', 'chi-tiet', id]}));
  }

  onDeleteUser(id: number): void {
    this.store.dispatch(new RemoveManageUser(id));
  }

  handlerChangePage(event: PageEvent): void {
    this.params = {
      ...this.params,
      page: event.pageIndex + 1,
      size: event.pageSize
    };
    // console.log('PageEvent', this.params);
    this.store.dispatch(new LoadManageUser(this.params));
  }

  handlerSearch(): void {
    this.params = {
      ...this.params,
      page: 1,
      ...this.formSearch.value
    };

    // console.log(this.params);
    this.store.dispatch(new LoadManageUser(this.params));
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
    styleBody: 'isActive',
    isStatus: true
  },
  {
    columnName: 'employeeCode',
    columnHeaderName: 'Mã nhân viên',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: true,
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
