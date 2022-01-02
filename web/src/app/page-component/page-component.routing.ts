import {Routes} from '@angular/router';
import {ProfileComponent} from './profile-component/profile.component';
import {EmployeeComponent} from './employee-component/employee.component';
import {ExpertsComponent} from './experts-component/experts.component';


export const PageRoutes: Routes = [
  {
    path: 'ho-so',
    component: ProfileComponent
  },
  {
    path: 'nhan-vien',
    component: EmployeeComponent
  },
  {
    path: 'chuyen-gia',
    component: ExpertsComponent
  },
];
