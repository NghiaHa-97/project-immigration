import {Component, Input, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  @Input() control!: FormControl;

  ngOnInit(): void {
    this.control = this.control ?? new FormControl();
  }
}
