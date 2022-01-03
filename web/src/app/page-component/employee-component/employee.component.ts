import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {PeriodicElement} from '../../dashboard/dashboard.component';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from "@angular/cdk/collections";
import {ColumnAndStyleModel} from "../../models/columns-and-styles.model";
import {STATUS_COLOR_STYLE} from "../../constans/status-color-style.const";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {FeatureState, getArrayEmployeeState, getEmployeeEntitiesState, LoadEmployee} from '../../store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  employees$!: Observable<any>
  // public chosenDate = _moment.now();
  public chosenDate = Date.now();

  @ViewChild('sort') sort!: MatSort;
  // options: FormGroup;
  hide = false;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // displayedColumns: string[] = [ 'position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = ELEMENT_DATA;
  selection = new SelectionModel<any>(true, []);
  columnsAndStyles: ColumnAndStyleModel[] = [
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
      columnName: 'avatar',
      columnHeaderName: 'Ảnh',
      styleHeader: {width: '60px', minWidth: '60px'},
      isSort: false,
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
      isSort: false,
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
      styleHeader: { minWidth: '100px'},
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
      styleHeader: { width: '180px'},
      isSort: true,
      styleBody: null,
      isStatus: false
    },
    {
      columnName: 'numberIdentityCard',
      columnHeaderName: 'Căn cước công dân',
      styleHeader: { width: '180px'},
      isSort: true,
      styleBody: null,
      isStatus: false
    },
    {
      columnName: 'createDate',
      columnHeaderName: 'Ngày tạo',
      styleHeader: { width: '180px'},
      isSort: false,
      styleBody: null,
      isStatus: false
    },
    {
      columnName: 'updateDate',
      columnHeaderName: 'Ngày sửa đổi',
      styleHeader: { width: '180px'},
      isSort: true,
      styleBody: null,
      isStatus: false
    }
  ];

  form!: FormGroup;

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
    this.store.dispatch(new LoadEmployee(null));
    this.employees$ = this.store.select(fromStore.getArrayEmployeeState);
    const l = {
      _5: 1,
      _2: 2,
      _3: 3
    };
    const b = {...l, b: 6, a: 18, _5: 100};
    Object.keys(b).forEach(x => console.log(x));

  }

  handlerChangePage(event: PageEvent): void {
    console.log('PageEvent', event);
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    console.log(this.sort);
    this.sort.sortChange.subscribe(x => console.log(x));
  }
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3333, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {
    position: 4,
    name: 'Beryl  {position: 4,   {position: 4, name: \'Be  {position: 4, name: \'Beryllium\', weight: 9.0122, symbol: \'Be\'},\n  {position: 4, name: \'Beryllium\', weight: 9.0122, symbol: \'Be\'},\nryllium\', weight: 9.0122, symbol: \'Be\'},\nname: \'Beryllium\', weight: 9.0122, symbol: \'Be\'},\nlium',
    weight: 9.0122,
    symbol: 'Be'
  },
  {position: 5, name: 'Boron', weight: "on: 4,   {position: 4,: 9.0122, symbol: \'Be\'", symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3333, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {
    position: 4,
    name: 'Beryl  {position: 4,   {position: 4, name: \'Be  {position: 4, name: \'Beryllium\', weight: 9.0122, symbol: \'Be\'},\n  {position: 4, name: \'Beryllium\', weight: 9.0122, symbol: \'Be\'},\nryllium\', weight: 9.0122, symbol: \'Be\'},\nname: \'Beryllium\', weight: 9.0122, symbol: \'Be\'},\nlium',
    weight: 9.0122,
    symbol: 'Be'
  },
  {position: 5, name: 'Boron', weight: "on: 4,   {position: 4,: 9.0122, symbol: \'Be\'", symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
