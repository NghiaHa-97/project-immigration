import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {ColumnAndStyleModel} from '../../models/columns-and-styles.model';
import {SelectionModel} from '@angular/cdk/collections';
import {MatMenuPanel, MatMenuTrigger} from '@angular/material/menu';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {getStyleBody} from '../../constans/status-color-style.const';
import {MatNoDataRow, MatTable} from '@angular/material/table';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  private mapSelected = new Map<number | string, any>();

  get resultSelected(): Map<number | string, any> {
    return this.mapSelected;
  }

  @ViewChild(MatNoDataRow) noDataRow!: MatNoDataRow;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;

  private dataTable!: any[];

  // Table Inputs
  @Input() set dataSource(data: any[]) {
    this.dataTable = data.map((item, i) => {
      item.index = (this.paginator?.pageIndex ?? 0) * (this.paginator?.pageSize ?? 0) + i + 1;
      return item;
    });

    // init map selected:
    if (!!this.selection && !!this.dataSource) {
      this.selection.selected.forEach(id => {
        const value = this.dataSource.find(item => item.id === id);
        this.mapSelected.set(id, value);
      });
    }
  }

  get dataSource(): any[] {
    return this.dataTable;
  }

  private columns!: ColumnAndStyleModel[];

  @Input() set columnsAndStyles(data: ColumnAndStyleModel[]) {
    this.columns = [{
      columnName: 'index',
      columnHeaderName: 'STT',
      styleHeader: null,   // style header
      isSort: false,
      styleBody: null,     // style body
      isStatus: false
    }, ...data];
  }

  get columnsAndStyles(): ColumnAndStyleModel[] {
    return this.columns;
  }

  @Input() selection!: SelectionModel<number | string>;
  @Input() stickyStart!: boolean;
  @Input() stickyEnd!: boolean;
  @Input() menuAction!: MatMenuPanel;
  @Input() isSelection!: boolean;
  @Input() isAction!: boolean;
  @Input() hiddenCheckBoxCheckAll = false;

  // MatPaginator Inputs
  @Input() totalRecord!: number;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];

  // MatPaginator output
  @Output() handlerChangePage = new EventEmitter<PageEvent>();
  // action
  @Output() selectAction = new EventEmitter<any>();

  displayedColumns!: string[];
  public colspan = 0;
  private destroy = new Subject();

  constructor() {
  }

  ngOnInit(): void {

    this.displayedColumns = this.columnsAndStyles.map(val => val.columnName);
    if (this.isSelection) {
      this.displayedColumns.unshift('select-table');
      // change map selected
      this.selection.changed
        .pipe(takeUntil(this.destroy))
        .subscribe(data => {
          data.removed.forEach(id => {
            this.mapSelected.delete(id);
          });
          data.added.forEach(id => {
            const value = this.dataSource.find(item => item.id === id);
            this.mapSelected.set(id, value);
          });
        });
    }
    if (this.isAction) {
      this.displayedColumns.push('action-table');
    }
    this.colspan = this.columnsAndStyles.length
      + (this.isAction ? 1 : 0)
      + (this.isSelection ? 1 : 0);
    // console.log(this.colspan);
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

  handlerPage(event: PageEvent): void {
    this.handlerChangePage.emit(event);
  }

  ngAfterViewInit(): void {
    this.table.setNoDataRow(this.noDataRow);
  }

  handlerAction(event: Event, id: any): void {
    event.stopPropagation();
    this.selectAction.emit(id);
  }

  getStyleBodyStatus(id: any): any {
    return getStyleBody(id);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
