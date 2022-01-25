import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ColumnAndStyleModel} from '../../models/columns-and-styles.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MatMenuPanel, MatMenuTrigger} from '@angular/material/menu';
import {PageEvent} from '@angular/material/paginator';
import {getStyleBody} from '../../constans/status-color-style.const';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit {

  // @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  // Table Inputs
  @Input() dataSource!: any;
  @Input() columnsAndStyles!: ColumnAndStyleModel[];
  @Input() selection!: SelectionModel<any>;
  @Input() stickyStart!: boolean;
  @Input() stickyEnd!: boolean;
  @Input() menuAction!: MatMenuPanel;
  @Input() isSelection!: boolean;
  @Input() isAction!: boolean;
  @Input() hiddenCheckBoxCheckAll = false;

  // MatPaginator Inputs
  @Input() totalRecord!: number;
  pageSize = 25;
  pageSizeOptions: number[] = [10, 25, 50, 100];

  // MatPaginator output
  @Output() handlerChangePage = new EventEmitter<PageEvent>();
  // action
  @Output() selectAction = new EventEmitter<any>();

  displayedColumns!: string[];

  constructor() {
  }

  ngOnInit(): void {

    this.displayedColumns = this.columnsAndStyles.map(val => val.columnName);
    if (this.isSelection) {
      this.displayedColumns.unshift('select-table');
    }
    if (this.isAction) {
      this.displayedColumns.push('action-table');
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filter((val: any) => val?.id).length;
    // const numRows = 200;
    // console.log(numSelected);
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.filter((val: any) => val?.id));
  }

  handlerSelectRow(e: Event, row: any): void {
    // console.log(e);
    // this.selection.toggle(row);
  }

  print(row: any, element: any): void {
    console.log(row);
    console.log(element);
  }

  handlerPage(event: PageEvent): void {
    this.handlerChangePage.emit(event);
  }

  ngAfterViewInit(): void {
  }

  handlerAction(event: Event, id: any): void {
    event.stopPropagation();
    this.selectAction.emit(id);
  }

  getStyleBodyStatus(id: number): any{
    return getStyleBody(id);
  }
}
