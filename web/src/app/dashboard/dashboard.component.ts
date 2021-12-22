import { SelectionModel } from '@angular/cdk/collections';
import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // options: FormGroup;
  hide = false;
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  // displayedColumns: string[] = [ 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  // constructor(private fb: FormBuilder) {
  //   this.options = fb.group({
  //     hideRequired: [true],
  //     floatLabel: ['auto'],
  //   });
  // }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
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
  {position: 4, name: 'Beryl  {position: 4,   {position: 4, name: \'Be  {position: 4, name: \'Beryllium\', weight: 9.0122, symbol: \'Be\'},\n  {position: 4, name: \'Beryllium\', weight: 9.0122, symbol: \'Be\'},\nryllium\', weight: 9.0122, symbol: \'Be\'},\nname: \'Beryllium\', weight: 9.0122, symbol: \'Be\'},\nlium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: "on: 4,   {position: 4, name: \'Be  {posisition: 4, nasition: 4, name: \'Be  {position: 4, name: \'Beryllium\', weight: 9.0122, symbome: \'Be  {position: 4, name: \'Beryllium\', weight: 9.0122, symbotion: 4, name: \'Beryllium\', weight: 9.0122, symbol: \'Be\'", symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
