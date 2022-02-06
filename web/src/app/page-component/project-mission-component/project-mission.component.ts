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
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {PatternFormat} from '../../constans/pattern-format-date.const';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Go, LoadProjectMission, RemoveProjectMission} from '../../store';
import {map, take, withLatestFrom} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {ColumnAndStyleModel} from '../../models/columns-and-styles.model';
import {getPrefixID} from '../../constans/prefix-id.const';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-mission',
  templateUrl: './project-mission.component.html',
  styleUrls: ['./project-mission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMissionComponent implements OnInit, AfterViewInit {
  isDialog = false;
  params: any = {};
  projectMissions$!: Observable<any[]>;
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
        this.onDetailProjectMission(x);
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
        .subscribe((x: number) => {
          this.nameProjectMissionDel$ = this.store.select(fromStore.getProjectMissionEntitiesState).pipe(
            map(entities => entities[getPrefixID(x)]?.name ?? '')
          );
          const dialogRef = this.dialog.open(this.dialogDelete, {
            width: '20%'
          });
          dialogRef.afterClosed()
            .pipe(take(1))
            .subscribe(result => {
              if (result) {
                this.onDeleteProjectMission(x);
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
  public nameProjectMissionDel$!: Observable<string>;

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
      name: [''],
      workUnitCreateName: [''],
      employeeName: [''],
      employeeCode: [''],

    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadProjectMission(null));
    this.projectMissions$ = this.store.select(fromStore.getArrayProjectMissionState).pipe(
      map(dataArray => dataArray.map(element => {
        return {
          ...element,
          createDate: this.patternFormat.formatDatetimeToString(element.createDate),
          updateDate: this.patternFormat.formatDatetimeToString(element.updateDate),
        };
      }))
    );
    this.totalItems$ = this.store.select(fromStore.getProjectMissionResponseStatusState).pipe(
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
      this.store.dispatch(new LoadProjectMission(this.params));
    });


    // if (this.btnDetail?.nativeElement) {
    //   this.eventClickDetails$ = fromEvent(this.btnDetail.nativeElement, 'click').pipe(map(e => 'detail'));
    //   this.eventClickDetails$.pipe(
    //     withLatestFrom(this.appTable.selectAction),
    //     map(([_, data2]) => data2)
    //   ).subscribe(x => {
    //     this.onDetailProjectMission(x);
    //     // console.log(x);
    //   });
    // }


    // this.eventClickUpdate$ = fromEvent(this.btnUpdate.nativeElement, 'click').pipe(map(e => 'update'));
    // this.eventClickUpdate$.pipe(
    //   withLatestFrom(this.appTable.selectAction),
    //   map(([data1, data2]) => data2)
    // ).subscribe(x => {
    //   console.log(x);
    // });

    // if (this.btnDelete?.nativeElement) {
    //   this.eventClickDelete$ = fromEvent(this.btnDelete.nativeElement, 'click').pipe(map(e => 'delete'));
    //   this.eventClickDelete$
    //     .pipe(
    //       withLatestFrom(this.appTable.selectAction),
    //       map(([_, data2]) => data2)
    //     )
    //     .subscribe((x: number) => {
    //       this.nameProjectMissionDel$ = this.store.select(fromStore.getProjectMissionEntitiesState).pipe(
    //         map(entities => entities[getPrefixID(x)]?.name ?? '')
    //       );
    //       const dialogRef = this.dialog.open(this.dialogDelete, {
    //         width: '20%'
    //       });
    //       dialogRef.afterClosed()
    //         .pipe(take(1))
    //         .subscribe(result => {
    //           if (result) {
    //             this.onDeleteProjectMission(x);
    //           }
    //         });
    //     });
    // }
  }

  onNewProjectMission(): void {
    this.store.dispatch(new Go({path: ['nhiem-vu-cong-viec', 'them-moi']}));
  }

  onDetailProjectMission(id: string): void {
    this.store.dispatch(new Go({path: ['nhiem-vu-cong-viec', 'chi-tiet', id]}));
  }

  onDeleteProjectMission(id: number): void {
    this.store.dispatch(new RemoveProjectMission(id));
  }

  handlerChangePage(event: PageEvent): void {
    this.params = {
      ...this.params,
      page: event.pageIndex + 1,
      size: event.pageSize
    };
    // console.log('PageEvent', this.params);
    this.store.dispatch(new LoadProjectMission(this.params));
  }

  handlerSearch(): void {
    this.params = {
      ...this.params,
      page: 1,
      ...this.formSearch.value
    };

    // console.log(this.params);
    this.store.dispatch(new LoadProjectMission(this.params));

  }
}

export const COLUMNS_AND_STYLES: ColumnAndStyleModel[] = [
  {
    columnName: 'name',
    columnHeaderName: 'Tên dự án, nhiệm vụ',
    styleHeader: {width: '350px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'workUnitCreateName',
    columnHeaderName: 'Tên đơn vị',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'employeeName',
    columnHeaderName: 'Tên nhân viên tạo',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'employeeCode',
    columnHeaderName: 'Mã nhân viên tạo',
    styleHeader: {width: '200px'},
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
