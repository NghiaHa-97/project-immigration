import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, Inject,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {TableComponent} from '../../common-component/table/table.component';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {PatternFormat} from '../../constans/pattern-format-date.const';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {
  Go,
  LoadAssignTasks,
  LoadProjectMission,
  LoadStatusProfile,
  RemoveAssignTasks,
  RemoveProjectMission
} from '../../store';
import {map, take, withLatestFrom} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {ColumnAndStyleModel} from '../../models/columns-and-styles.model';
import {getPrefixID} from '../../constans/prefix-id.const';
import * as _ from 'lodash';
import {PermissionConst} from '../../constans/Permission.const';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  // styleUrls: ['./assign-tasks.component.scss'],
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignTasksComponent implements OnInit, AfterViewInit {
  PermissionConst = PermissionConst;
  isDialog = false;
  params: any = {};
  tasks$!: Observable<any[]>;
  totalItems$!: Observable<number>;

  @ViewChild('dialogDelete', {
    static: true
  }) dialogDelete!: TemplateRef<any>;

  @ViewChild('appTable') appTable!: TableComponent;
  // @ViewChild('btnDetail', {
  //   static: false,
  //   read: ElementRef
  // }) btnDetail!: ElementRef;

  @ViewChild('btnDetail', {
    static: false,
    read: ElementRef
  }) set btnDetail(btn: ElementRef) {
    if (btn?.nativeElement) {
      this.eventClickDetails$ = fromEvent(btn.nativeElement, 'click').pipe(map(e => 'detail'));
      this.eventClickDetails$.pipe(
        withLatestFrom(this.appTable.selectAction),
        map(([notUsed, data2]) => data2)
      ).subscribe(x => {
        this.onDetailTask(x);
        // console.log(x);
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
      this.eventClickDelete$ = fromEvent(btn.nativeElement, 'click').pipe(map(e => 'delete'));
      this.eventClickDelete$
        .pipe(
          withLatestFrom(this.appTable.selectAction),
          map(([notUsed, data2]) => data2)
        )
        .subscribe((x: string) => {
          // this.nameProjectMissionDel$ = this.store.select(fromStore.getProjectMissionEntitiesState).pipe(
          //   map(entities => entities[getPrefixID(x)]?.name ?? '')
          // );
          const dialogRef = this.dialog.open(this.dialogDelete, {
            width: '20%'
          });
          dialogRef.afterClosed()
            .pipe(take(1))
            .subscribe(result => {
              if (result) {
                this.onDeleteTask(x);
              }
            });
        });
    }
  }

  eventClickDetails$!: Observable<any>;
  // eventClickUpdate$!: Observable<any>;
  eventClickDelete$!: Observable<any>;

  @ViewChild('sort') sort!: MatSort;

  columnsAndStyles = COLUMNS_AND_STYLES;

  formSearch!: FormGroup;
  public data!: any[];
  listStatusProfile$!: Observable<any>;

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private patternFormat: PatternFormat,
              private dialog: MatDialog) {

    this.formSearch = this.fb.group({
      title: [''],
      employeeCode: [''],
      employeeFullname: [''],
      departmentName: [''],
      profileCode: [''],
      expirationDate: [''],
      statusProfileID: [''],
    });
  }

  get expirationDate(): FormControl {
    return this.formSearch.get('expirationDate') as FormControl;
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
    this.store.dispatch(new LoadAssignTasks(null));
    this.tasks$ = this.store.select(fromStore.getArrayAssignTasksState).pipe(
      map(dataArray => dataArray.map(element => {
        return {
          ...element,
          createDate: this.patternFormat.formatDatetimeToString(element.createDate),
          updateDate: this.patternFormat.formatDatetimeToString(element.updateDate),
          expirationDate: this.patternFormat.formatDatetimeToString(element.expirationDate),
        };
      }))
    );
    this.totalItems$ = this.store.select(fromStore.getAssignTasksResponseStatusState).pipe(
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
      this.store.dispatch(new LoadAssignTasks(this.params));
    });
  }

  onNewTask(): void {
    this.store.dispatch(new Go({path: ['nhiem-vu', 'them-moi']}));
  }

  onDetailTask(id: string): void {
    this.store.dispatch(new Go({path: ['nhiem-vu', 'chi-tiet', id]}));
  }

  onDeleteTask(id: string): void {
    this.store.dispatch(new RemoveAssignTasks(id));
  }

  handlerChangePage(event: PageEvent): void {
    this.params = {
      ...this.params,
      page: event.pageIndex + 1,
      size: event.pageSize
    };
    // console.log('PageEvent', this.params);
    this.store.dispatch(new LoadAssignTasks(this.params));
  }

  handlerSearch(): void {
    this.params = {
      ...this.params,
      page: 1,
      ...this.formSearch.value,
      expirationDate: this.patternFormat.formatDateToDateRequest(this.formSearch.value.expirationDate)
    };

    // console.log(this.params);
    this.store.dispatch(new LoadAssignTasks(this.params));
  }
}

export const COLUMNS_AND_STYLES: ColumnAndStyleModel[] = [
  {
    columnName: 'title',
    columnHeaderName: 'Tiêu đề',
    styleHeader: {width: '350px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'employeeFullname',
    columnHeaderName: 'Tên nhân viên nhận',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'employeeCode',
    columnHeaderName: 'Mã nhân viên nhận',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'departmentName',
    columnHeaderName: 'Phòng ban nhận',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'profileCode',
    columnHeaderName: 'Mã hồ sơ',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'statusProfileName',
    columnHeaderName: 'Trạng thái hồ sơ',
    styleHeader: {width: '200px', minWidth: '100px'},
    isSort: true,
    styleBody: 'statusProfileID',
    isStatus: true
  },
  {
    columnName: 'expirationDate',
    columnHeaderName: 'Ngày hết hạn nhiệm vụ',
    styleHeader: {width: '250px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'createDate',
    columnHeaderName: 'Ngày tạo',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'updateDate',
    columnHeaderName: 'Ngày sửa đổi',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  }
];
