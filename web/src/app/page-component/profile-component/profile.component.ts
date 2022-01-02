import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {PeriodicElement} from "../../dashboard/dashboard.component";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {ColumnAndStyleModel} from "../../models/columns-and-styles.model";
import {STATUS_COLOR_STYLE} from "../../constans/status-color-style.const";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit{
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
      columnName: 'position',
      styleHeader: {width: '400px', minWidth: '200px'},
      isSort: true,
      styleBody: null,
      isStatus: false
    },
    {
      columnName: 'name',
      styleHeader: {width: '200px', minWidth: '200px'},
      isSort: true,
      styleBody: null,
      isStatus: false
    },
    {
      columnName: 'weight',
      styleHeader: {width: '400px', minWidth: '200px'},
      isSort: false,
      styleBody: STATUS_COLOR_STYLE.RED,
      isStatus: true
    },
    {
      columnName: 'symbol',
      styleHeader: {width: '200px', minWidth: '200px'},
      isSort: true,
      styleBody: null,
      isStatus: false
    }
  ];

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
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

  handlerChangePage(event: PageEvent): void {
    console.log('PageEvent', event);
  }

  ngOnInit(): void {
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
