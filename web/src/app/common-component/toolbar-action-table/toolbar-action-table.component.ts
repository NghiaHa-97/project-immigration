import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-toolbar-action-table',
  templateUrl: './toolbar-action-table.component.html',
  styleUrls: ['./toolbar-action-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarActionTableComponent implements OnInit{
  // @Input() formSearch!: FormGroup;
  @Output() handlerSearch: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {

  }

  search(): void {
    this.handlerSearch.emit(null);
  }
}
