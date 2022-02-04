import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoMaterialModule} from '../demo-material-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ChartistModule} from 'ng-chartist';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {CustomDateAdapter, MY_FORMATS} from './datepicker/custom-datepicker-format';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {RichTextEditorComponent} from './rich-text-editor/rich-text-editor.component';
import {TableComponent} from './table/table.component';
import {ToolbarActionTableComponent} from './toolbar-action-table/toolbar-action-table.component';
import {QuillModule} from 'ngx-quill';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomPaginatorIntl} from './table/custom-paginator-intl';
import {SafeHtmlPipe} from './safe-html.pipe';
import {InputImageComponent} from './input-image/input-image.component';
import {TreeCheckboxComponent} from './tree-checkbox/tree-checkbox.component';
import {SelectFilterVirtualScrollComponent} from './select-filter-virtual-scroll/select-filter-virtual-scroll.component';



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
    ToolbarActionTableComponent,
    SafeHtmlPipe,
    InputImageComponent,
    TreeCheckboxComponent,
    SelectFilterVirtualScrollComponent,
  ],
  exports: [
    RichTextEditorComponent,
    DatepickerComponent,
    ToolbarActionTableComponent,
    TableComponent,
    SafeHtmlPipe,
    InputImageComponent,
    TreeCheckboxComponent,
    SelectFilterVirtualScrollComponent,
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
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'vi-VN'
    }
  ]
})
export class CommonComponentModule {
}
