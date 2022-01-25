import {Injectable} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

export const COLOR_SNACK_BAR = {
  RED: 'red-snackbar',
  GREEN: 'green-snackbar'
};

@Injectable()
export class NotificationSnackBar {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, color: string): void {
    this.snackBar.open(message, 'Đóng', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [color],
      duration: 3000
    });
  }
}
