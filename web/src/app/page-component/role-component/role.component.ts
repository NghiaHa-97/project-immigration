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
import {Go, LoadRole, RemoveRole} from '../../store';
import {map, take, withLatestFrom} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {ColumnAndStyleModel} from '../../models/columns-and-styles.model';
import {getPrefixID} from '../../constans/prefix-id.const';
import * as _ from 'lodash';
import {PermissionConst} from '../../constans/Permission.const';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleComponent implements OnInit, AfterViewInit {
  PermissionConst = PermissionConst;
  isDialog = false;
  params: any = {};
  roles$!: Observable<any[]>;
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
        this.onDetailRole(x);
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
          this.nameRoleDel$ = this.store.select(fromStore.getRoleEntitiesState).pipe(
            map(entities => entities[getPrefixID(x)]?.name ?? '')
          );
          const dialogRef = this.dialog.open(this.dialogDelete, {
            width: '20%'
          });
          dialogRef.afterClosed()
            .pipe(take(1))
            .subscribe(result => {
              if (result) {
                this.onDeleteRole(x);
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
  public nameRoleDel$!: Observable<string>;

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
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadRole(null));
    this.roles$ = this.store.select(fromStore.getArrayRoleState).pipe(
      map(dataArray => dataArray.map(element => {
        return {
          ...element,
          createDate: this.patternFormat.formatDatetimeToString(element.createDate),
          updateDate: this.patternFormat.formatDatetimeToString(element.updateDate),
        };
      }))
    );
    this.totalItems$ = this.store.select(fromStore.getRoleResponseStatusState).pipe(
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
      this.store.dispatch(new LoadRole(this.params));
    });


    // if (this.btnDetail?.nativeElement) {
    //   this.eventClickDetails$ = fromEvent(this.btnDetail.nativeElement, 'click').pipe(map(e => 'detail'));
    //   this.eventClickDetails$.pipe(
    //     withLatestFrom(this.appTable.selectAction),
    //     map(([_, data2]) => data2)
    //   ).subscribe(x => {
    //     this.onDetailRole(x);
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
    //       this.nameRoleDel$ = this.store.select(fromStore.getRoleEntitiesState).pipe(
    //         map(entities => entities[getPrefixID(x)]?.name ?? '')
    //       );
    //       const dialogRef = this.dialog.open(this.dialogDelete, {
    //         width: '20%'
    //       });
    //       dialogRef.afterClosed()
    //         .pipe(take(1))
    //         .subscribe(result => {
    //           if (result) {
    //             this.onDeleteRole(x);
    //           }
    //         });
    //     });
    // }
  }

  onNewRole(): void {
    this.store.dispatch(new Go({path: ['quan-ly-vai-tro', 'them-moi']}));
  }

  onDetailRole(id: string): void {
    // console.log('manage-user-detail', id);
    this.store.dispatch(new Go({path: ['quan-ly-vai-tro', 'chi-tiet', id]}));
  }

  onDeleteRole(id: number): void {
    this.store.dispatch(new RemoveRole(id));
  }

  handlerChangePage(event: PageEvent): void {
    this.params = {
      ...this.params,
      page: event.pageIndex + 1,
      size: event.pageSize
    };
    // console.log('PageEvent', this.params);
    this.store.dispatch(new LoadRole(this.params));
  }

  handlerSearch(): void {
    this.params = {
      ...this.params,
      page: 1,
      ...this.formSearch.value
    };

    // console.log(this.params);
    this.store.dispatch(new LoadRole(this.params));

  }
}

export const COLUMNS_AND_STYLES: ColumnAndStyleModel[] = [
  {
    columnName: 'name',
    columnHeaderName: 'T??n vai tr??',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'createDate',
    columnHeaderName: 'Ng??y t???o',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'updateDate',
    columnHeaderName: 'Ng??y s???a ?????i',
    styleHeader: {width: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  }
];
