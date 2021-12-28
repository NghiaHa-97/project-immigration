import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoMaterialModule} from '../demo-material-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartistModule} from 'ng-chartist';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {CustomDateAdapter, MY_FORMATS} from './datepicker/custom-datepicker-format';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {RichTextEditorComponent} from './rich-text-editor/rich-text-editor.component';
import {TableComponent} from './table/table.component';
import {ToolbarActionTableComponent} from './toolbar-action-table/toolbar-action-table.component';
import {QuillModule} from 'ngx-quill';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomPaginatorIntl} from './table/custom-paginator-intl';


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule
  ],
  declarations: [
    DatepickerComponent,
    RichTextEditorComponent,
    TableComponent,
    ToolbarActionTableComponent
  ],
  exports: [
    RichTextEditorComponent,
    DatepickerComponent,
    ToolbarActionTableComponent,
    TableComponent
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorIntl
    }
  ]
})
export class CommonComponentModule {
}
