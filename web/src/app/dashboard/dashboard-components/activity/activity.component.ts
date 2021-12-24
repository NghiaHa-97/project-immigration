import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import { Activity, activities } from './activity-data';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activityData: Activity[];

  @Input()
  template!: TemplateRef<any>;
  constructor() {

    this.activityData = activities;
  }


  ngOnInit(): void {
  }

}
