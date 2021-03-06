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
import {FormBuilder, FormGroup} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {fromEvent, Observable} from 'rxjs';
import {TableComponent} from '../../common-component/table/table.component';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Go, LoadExperts, RemoveExperts} from '../../store';
import {map, take, withLatestFrom} from 'rxjs/operators';
import * as moment from 'moment';
import {PatternFormat} from '../../constans/pattern-format-date.const';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import * as _ from 'lodash';
import {getPrefixID} from '../../constans/prefix-id.const';
import {PermissionConst} from '../../constans/Permission.const';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertsComponent implements OnInit, AfterViewInit{
  PermissionConst = PermissionConst;
  isDialog = false;
  experts$!: Observable<any[]>;
  params: any = {};
  totalItems$!: Observable<number>;
  nameExpertDel$!: Observable<string>;
  @ViewChild('dialogDelete', {
    static: true
  }) dialogDelete!: TemplateRef<any>;
  @ViewChild('appTable') appTable!: TableComponent;
  @ViewChild('btnDetail', {
    static: false,
    read: ElementRef
  }) set btnDetail(btn: ElementRef){
    if (btn?.nativeElement) {
      this.eventClickDetails$ = fromEvent(btn?.nativeElement, 'click')
        .pipe(map(e => 'detail'));
      this.eventClickDetails$.pipe(
        withLatestFrom(this.appTable.selectAction),
        map(([data1, data2]) => data2)
      ).subscribe(x => {
        this.onDetailExperts(x);
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
  }) set btnDelete(btn: ElementRef){
    if (btn?.nativeElement) {
      this.eventClickDelete$ = fromEvent(btn?.nativeElement, 'click')
        .pipe(map(e => 'delete'));
      this.eventClickDelete$.pipe(
        withLatestFrom(this.appTable.selectAction),
        map(([data1, data2]) => data2)
      ).subscribe(x => {
        this.nameExpertDel$ = this.store.select(fromStore.getExpertsEntitiesState)
          .pipe(
            map(entities => entities[getPrefixID(x)]?.fullname ?? '')
          );
        const dialogRef = this.dialog.open(this.dialogDelete, {
          width: '20%'
        });
        dialogRef.afterClosed()
          .pipe(take(1))
          .subscribe(result => {
            if (result) {
              this.onDeleteExperts(x);
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
      countryName: [''],
      cityProvinceName: [''],
      permanentResidentialAddress: [''],
      phoneNumber: [''],
      passportNumber: [''],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadExperts(null));
    this.experts$ = this.store.select(fromStore.getArrayExpertsState).pipe(
      map(dataArray => dataArray.map(element => {
        return {
          ...element,
          createDate: this.patternFormat.formatDatetimeToString(element.createDate),
          updateDate: this.patternFormat.formatDatetimeToString(element.updateDate),
          birthDay: this.patternFormat.formatDateToString(element.birthDay),
          dateOfEntry: this.patternFormat.formatDateToString(element.dateOfEntry),
          expiryDate: this.patternFormat.formatDateToString(element.expiryDate),
          gender: element.gender ? 'Nam' : 'N???'
        };
      })),
    );

    this.totalItems$ = this.store.select(fromStore.getExpertsResponseStatusState).pipe(
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
      this.store.dispatch(new LoadExperts(this.params));
    });

    // this.eventClickUpdate$ = fromEvent(this.btnUpdate.nativeElement, 'click').pipe(map(e => 'update'));
    // this.eventClickUpdate$.pipe(
    //   withLatestFrom(this.appTable.selectAction),
    //   map(([data1, data2]) => data2)
    // ).subscribe(x => {
    //   this.onDetailExperts(x);
    //   console.log(x);
    // });


  }

  onNewExperts(): void {
    this.store.dispatch(new Go({path: ['chuyen-gia', 'them-moi']}));
  }

  onDetailExperts(id: string): void {
    this.store.dispatch(new Go({path: ['chuyen-gia', 'chi-tiet', id]}));
  }
  onDeleteExperts(id: string): void {
    this.store.dispatch(new RemoveExperts(id));
  }

  handlerChangePage(event: PageEvent): void {
    this.params = {
      ...this.params,
      page: event.pageIndex + 1,
      size: event.pageSize
    };
    this.store.dispatch(new LoadExperts(this.params));
  }

  handlerSearch(): void {
    this.params = {
      ...this.params,
      page: 1,
      ...this.formSearch.value
    };
    this.store.dispatch(new LoadExperts(this.params));
  }
}

export const COLUMNS_AND_STYLES: ColumnAndStyleModel[] = [
  {
    columnName: 'code',
    columnHeaderName: 'M??',
    styleHeader: {width: '100px', minWidth: '100px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'fullname',
    columnHeaderName: 'H??? t??n',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'gender',
    columnHeaderName: 'Gi???i t??nh',
    styleHeader: {width: '80px', minWidth: '80px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'birthDay',
    columnHeaderName: 'Ng??y sinh',
    styleHeader: {width: '100px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'countryName',
    columnHeaderName: 'Qu??c t???ch',
    styleHeader: {width: '150px', minWidth: '150px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'religion',
    columnHeaderName: 'T??n gi??o',
    styleHeader: {width: '150px', minWidth: '150px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'occupation',
    columnHeaderName: 'Ngh??? nghi???p',
    styleHeader: {width: '150px', minWidth: '150px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'permanentResidentialAddress',
    columnHeaderName: '?????a ch??? th?????ng ch??',
    styleHeader: {width: '200px', minWidth: '200px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'phoneNumber',
    columnHeaderName: 'S??? ??i???n tho???i',
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
    columnHeaderName: 'S??? h??? chi???u',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'expiryDate',
    columnHeaderName: 'Ng??y h???t h???n',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'dateOfEntry',
    columnHeaderName: 'Ng??y nh???p c???nh',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'lengthOfStay',
    columnHeaderName: 'Th???i gian l??u tr??',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  // {
  //   columnName: 'passportImage',
  //   columnHeaderName: '???nh h??? chi???u',
  //   styleHeader: {width: '180px'},
  //   isSort: true,
  //   styleBody: null,
  //   isStatus: false
  // },
  // {
  //   columnName: 'portraitPhotography',
  //   columnHeaderName: '???nh ch??n dung',
  //   styleHeader: {width: '180px'},
  //   isSort: true,
  //   styleBody: null,
  //   isStatus: false
  // },
  {
    columnName: 'createDate',
    columnHeaderName: 'Ng??y t???o',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  },
  {
    columnName: 'updateDate',
    columnHeaderName: 'Ng??y s???a ?????i',
    styleHeader: {width: '180px'},
    isSort: true,
    styleBody: null,
    isStatus: false
  }
];
