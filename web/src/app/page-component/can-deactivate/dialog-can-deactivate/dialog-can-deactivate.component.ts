import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-dialog-can-deactivate',
  template: `
    <h1 mat-dialog-title>Đã có thay đổi</h1>
    <div mat-dialog-content>
      <p>Bạn có chắc muốn thoát mà không lưu?</p>
    </div>
    <div mat-dialog-actions class="float-right">
      <button mat-button [mat-dialog-close]="true">Đồng ý</button>
      <button mat-button [mat-dialog-close]="false" cdkFocusInitial>Hủy</button>
    </div>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCanDeactivateComponent{
  constructor() {
  }
}
