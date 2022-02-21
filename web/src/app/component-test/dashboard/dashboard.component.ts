import {SelectionModel} from '@angular/cdk/collections';
import {
  Component,
  AfterViewInit,
  ViewChild,
  TemplateRef,
  ElementRef,
  ChangeDetectionStrategy,
  OnInit, ChangeDetectorRef
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import * as _moment from 'moment';
import {ColumnAndStyleModel} from "../../models/columns-and-styles.model";
import {PageEvent} from "@angular/material/paginator";
import {STATUS_COLOR_STYLE} from "../../constans/status-color-style.const";
import {ThemePalette} from '@angular/material/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {LoadAllRole, LoadModule} from '../../store';
import {BehaviorSubject, interval, Observable, of} from 'rxjs';
import {TodoItemFlatNode, TodoItemNode} from '../../common-component/tree-checkbox/tree-checkbox.component';
import {COLOR_SNACK_BAR, NotificationSnackBar} from '../../notification/notification-snack-bar';
import {tap} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import {EmployeeComponent} from '../../page-component/employee-component/employee.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements AfterViewInit, OnInit {
  // public chosenDate = _moment.now();
  public chosenDate = Date.now();
  public dataAutoComplete$ = new BehaviorSubject<string[]>([]);
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('temp') temp!: TemplateRef<any>;
  // @ViewChild('autoComplete', {
  //   read: AutoCompleteVirtualScrollComponent,
  //   static: true
  // }) autoComplete!: AutoCompleteVirtualScrollComponent;
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
      columnHeaderName: '',
      styleHeader: {width: '400px', minWidth: '200px'},
      isSort: true,
      styleBody: null,
      isStatus: false
    },
    {
      columnName: 'name',
      columnHeaderName: '',
      styleHeader: {width: '200px', minWidth: '200px'},
      isSort: true,
      styleBody: null,
      isStatus: false
    },
    {
      columnName: 'weight',
      columnHeaderName: '',
      styleHeader: {width: '400px', minWidth: '200px'},
      isSort: false,
      styleBody: STATUS_COLOR_STYLE.RED,
      isStatus: true
    },
    {
      columnName: 'symbol',
      columnHeaderName: '',
      styleHeader: {width: '200px', minWidth: '200px'},
      isSort: true,
      styleBody: null,
      isStatus: false
    }
  ]

  richTextForm!: FormGroup;
  form!: FormGroup;

  checklistSelection: SelectionModel<TodoItemFlatNode> = new SelectionModel<TodoItemFlatNode>(true);
  data$!: Observable<TodoItemNode[]>;
  // initSelected$ = new BehaviorSubject<number[]>([]);
  initSelected$!: Observable<number[]>;
  dataTest!: string[];
  dataAllRole$!: Observable<any[]>;

  constructor(private fb: FormBuilder,
              private store: Store<fromStore.FeatureState>,
              private notification: NotificationSnackBar,
              private changeDetectorRef: ChangeDetectorRef,
              private dialog: MatDialog ) {
    this.store.dispatch(new LoadModule(null));
    this.data$ = this.store.select(fromStore.getModuleTodoItemNodeState);
    this.initSelected$ = of([11, 12])
    this.store.dispatch(new LoadAllRole(null));
    this.dataAllRole$ = this.store.select(fromStore.getArrayRoleAllState);

    // this.options = fb.group({
    //   hideRequired: [true],
    //   floatLabel: ['auto'],
    // });
    this.richTextForm = this.fb.group(
      {
        title: ["Hello, I am ", Validators.required],
        description: [
          `<h2><u>This is </u>a <span style=\"color: rgb(240, 102, 102);\">RICH</span> <strong>text editor</strong> <em>for</em> - <a href=\"http://jira.trungk18.com/\" rel=\"noopener noreferrer\" target=\"_blank\">http://.com/</a></h2><h3><span style=\"color: rgb(153, 51, 255);\">I hope you </span><strong style=\"color: rgb(153, 51, 255);\">like it!</strong></h3>`
        ]
      }
    )
    this.form = this.fb.group({
      selector: ['option2']
    })
  }

  search() {
    this.notification.openSnackBar('lua', COLOR_SNACK_BAR.GREEN);
    // this.notification.openSnackBar('lua', COLOR_SNACK_BAR.RED);
    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: '1000px',
      height: '80%',
      data:  {name: 111}
    });
    // console.log(this.checklistSelection.selected);
    const m = _moment('2021-05-13T14:46:40.315428+09:00').utc().format()
    console.log("m ", m)
    // this.dataTest = [...this.dataTest, ...this.dataTest];
  }

  get valueSelector() {
    return {
      image: 'assets/images/users/1.jpg',
      value: this.form.get('selector')?.value + 'Lua'
    };
  }

  get descriptionRichControl() {
    return this.richTextForm.controls.description as FormControl;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  handlerSelectRow(e: Event, row: any) {
    console.log(1, e);
    console.log(row);
    this.selection.toggle(row);

  }

  handlerChangePage(event: PageEvent): void {
    console.log('PageEvent', event);
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    console.log(this.sort);
    this.sort.sortChange.subscribe(x => console.log(x));
  }

  // lll(e:Event){
  //   console.log(2,e);
  //   e.stopPropagation();
  // }

  // checkboxLabel(row?: PeriodicElement): string {
  //   console.log(row);
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }


  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  allComplete: boolean = false;
  numberTest: any;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  ngOnInit(): void {


    this.dataTest = Array
      .from({length: 20})
      .map((_, i) => Math.random().toString(36).substring(7)).sort();
    // this.dataTest = ["1","2","3"];


    // this.autoComplete.onChangePage.subscribe(
    //   page => {
    //     console.log(page);
    //
    //     this.dataTest = [...this.dataTest, ...this.dataTest];
    //
    //
    //     this.dataAutoComplete$.next([...this.dataTest]);
    //     this.changeDetectorRef.detectChanges();
    //
    //     // this.dataAutoComplete$.subscribe(data=>console.log(data.length))
    //     // console.log(this.dataTest.length);
    //   }
    // );
  }


}

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: any;
  symbol: string;
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
