import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() name!: string;

  ngOnInit(): void {
    this.control = this.control ?? new FormControl();
  }
}
