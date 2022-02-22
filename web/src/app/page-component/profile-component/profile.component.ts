import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, Inject,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {ColumnAndStyleModel} from '../../models/columns-and-styles.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {fromEvent, Observable} from 'rxjs';
import {TableComponent} from '../../common-component/table/table.component';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {
  CreateComment, getArrayCommentState,
  getProfileEntitiesState,
  Go, LoadCommentByProfIle, LoadDetailProfile,
  LoadProfile,
  LoadStatusProfile,
  RemoveProfile
} from '../../store';
import {map, skip, take, withLatestFrom} from 'rxjs/operators';
import * as moment from 'moment';
import {PatternFormat} from '../../constans/pattern-format-date.const';
import {getPrefixID} from '../../constans/prefix-id.const';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import * as _ from 'lodash';
import {EmployeeComponent} from '../employee-component/employee.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, AfterViewInit {
  isDialog = false;
  profiles$!: Observable<any[]>;
  params: any = {};
  codeProfileDel$!: Observable<string>;
  totalItems$!: Observable<number>;
  listStatusProfile$!: Observable<any>;
  profileComment$!: Observable<any>;
  listComment$!: Observable<any[]>;

  @ViewChild('appTable') appTable!: TableComponent;
  @ViewChild('dialogAddComment', {static: true}) dialogAddComment!: TemplateRef<any>;
  @ViewChild('dialogViewComment', {static: true}) dialogViewComment!: TemplateRef<any>;
  @ViewChild('dialogDelete', {
    static: true
  }) dialogDelete!: TemplateRef<any>;
  formComment: FormGroup;

  @ViewChild('btnDetail', {
    static: false,
    read: ElementRef
  }) set btnDetail(btn: ElementRef) {
    if (btn?.nativeElement) {
      this.eventClickDetails$ = fromEvent(btn?.nativeElement, 'click').pipe(map(e => 'detail'));
      this.eventClickDetails$.pipe(
        withLatestFrom(this.appTable.selectAction),
        map(([data1, data2]) => data2)
      ).subscribe(x => {
        this.onDetailProfile(x);
      });
    }
  }

  @ViewChild('viewComment', {
    static: false,
    read: ElementRef
  }) set viewComment(btn: ElementRef) {
    if (btn?.nativeElement) {
      this.eventClickDetails$ = fromEvent(btn?.nativeElement, 'click').pipe(map(e => 'viewComment'));
      this.eventClickDetails$.pipe(
        withLatestFrom(this.appTable.selectAction),
        map(([data1, data2]) => data2)
      ).subscribe(x => {
        // this.onDetailProfile(x);
        this.profileComment$ = this.store.select(getProfileEntitiesState).pipe(
          map(entities => entities[getPrefixID(x)])
        );
        const dialogEmployeeRef = this.dialog.open(this.dialogViewComment, {
          width: '60%',
          height: '75%',
        });
        this.listComment$ = this.store.select(getArrayCommentState).pipe(
          skip(1)
        );
        this.store.dispatch(new LoadCommentByProfIle({profileID: x}));
      });
    }
  }

  @ViewChild('addComment', {
    static: false,
    read: ElementRef
  }) set addComment(btn: ElementRef) {
    if (btn?.nativeElement) {
      this.eventClickDetails$ = fromEvent(btn?.nativeElement, 'click').pipe(map(e => 'addComment'));
      this.eventClickDetails$.pipe(
        withLatestFrom(this.appTable.selectAction),
        map(([data1, data2]) => data2)
      ).subscribe(x => {
        this.formComment.patchValue({
          profileID: x
        });
        this.profileComment$ = this.store.select(getProfileEntitiesState).pipe(
          map(entities => entities[getPrefixID(x)])
        );

        const dialogEmployeeRef = this.dialog.open(this.dialogAddComment, {
          width: '60%',
          height: '75%',
        });

        dialogEmployeeRef.afterClosed()
          .pipe(take(1))
          .subscribe(() => {
            this.formComment.reset();
          });
      });
    }
  }

  @ViewChild('btnDelete', {
    static: false,
    read: ElementRef
  }) set btnDelete(btn: ElementRef) {
    if (btn?.nativeElement) {
      this.eventClickDelete$ = fromEvent(btn?.nativeElement, 'click').pipe(map(e => 'delete'));
      this.eventClickDelete$.pipe(
        withLatestFrom(this.appTable.selectAction),
        map(([data1, data2]) => data2)
      ).subscribe(x => {
        this.codeProfileDel$ = this.store.select(fromStore.getProfileEntitiesState)
          .pipe(
            map(entities => entities[getPrefixID(x)]?.code ?? '')
          );
        const dialogRef = this.dialog.open(this.dialogDelete, {
          width: '20%'
        });
        dialogRef.afterClosed()
          .pipe(take(1))
          .subscribe(result => {
            if (result) {
              this.onDeleteProfile(x);
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
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    this.isDialog = !_.isEmpty(dataDialog);
    if (this.isDialog) {
      this.selection = new SelectionModel<number | string>(dataDialog.isSelectMulti, dataDialog.itemSelected);
    }
    this.formSearch = this.fb.group({
      code: [''],
      projectMissionName: [''],
      statusProfileID: [''],
      employeeCreate: [''],
      approver: [''],
      expirationDate: [moment().format()]
    });

    this.formComment = this.fb.group({
      profileID: [null],
      status: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  get expirationDate(): FormControl {
    return this.formSearch.get('expirationDate') as FormControl;
  }

  get reason(): FormControl {
    return this.formComment.get('reason') as FormControl;
  }


  ngOnInit(): void {
    this.listStatusProfile$ = this.store.select(fromStore.getArrayStatusProfileState);
    this.store.select(fromStore.getStatusProfileLoadedState)
      .pipe(take(1))
      .subscribe(isLoaded => {
        if (!isLoaded) {
          this.store.dispatch(new LoadStatusProfile(null));
        }
      });

    this.store.dispatch(new LoadProfile(null));
    this.profiles$ = this.store.select(fromStore.getArrayProfileState).pipe(
      map(dataArray => dataArray.map(element => {
        return {
          ...element,
          createDate: this.patternFormat.formatDatetimeToString(element.createDate),
          updateDate: this.patternFormat.formatDatetimeToString(element.updateDate),
          expirationDate: this.patternFormat.formatDatetimeToString(element.expirationDate)
        };
      })),
    );
    this.totalItems$ = this.store.select(fromStore.getProfileResponseStatusState).pipe(
      map(data => data?.totalElements ?? 0)
    );
  }


  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(x => {
      this.params = {
        ...this.params,
        sort: x.direction === '' ? null : [`${x.active},${x.direction}`]
      };
      this.store.dispatch(new LoadProfile(this.params));
    });


    // this.eventClickUpdate$ = fromEvent(this.btnUpdate.nativeElement, 'click').pipe(map(e => 'update'));
    // this.eventClickUpdate$.pipe(
    //   withLatestFrom(this.appTable.selectAction),
    //   map(([data1, data2]) => data2)
    // ).subscribe(x => {
    //   this.onDetailProfile(x);
    //   console.log(x);
    // });


  }

  onNewProfile(): void {
    this.store.dispatch(new Go({path: ['ho-so', 'them-moi']}));
  }

  onDetailProfile(id: string): void {
    this.store.dispatch(new Go({path: ['ho-so', 'chi-tiet', id]}));
  }

  onDeleteProfile(id: string): void {
    this.store.dispatch(new RemoveProfile(id));
  }

  handlerChangePage(event: PageEvent): void {
    this.params = {
      ...this.params,
      page: event.pageIndex + 1,
      size: event.pageSize
    };
    this.store.dispatch(new LoadProfile(this.params));
  }

  handlerSearch(): void {
    this.params = {
      ...this.params,
      page: 1,
      ...this.formSearch.value,
      expirationDate: this.patternFormat.formatDateToDateRequest(this.formSearch.value.expirationDate)
    };
    this.store.dispatch(new LoadProfile(this.params));
  }

  saveComment(): void {
    console.log(11111);
    if (this.formComment.valid) {
      this.store.dispatch(new CreateComment({
        ...this.formComment.value
      }));
      this.formComment.reset();
    }
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
  // {
  //   columnName: 'unitCreateProfileName',
  //   columnHeaderName: 'Đơn vị tạo',
  //   styleHeader: {width: '200px'},
  //   isSort: true,
  //   styleBody: null,
  //   isStatus: false
  // },
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
