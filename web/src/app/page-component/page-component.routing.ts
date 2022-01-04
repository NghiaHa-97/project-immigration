import {Routes} from '@angular/router';
import {ProfileComponent} from './profile-component/profile.component';
import {EmployeeComponent} from './employee-component/employee.component';
import {ExpertsComponent} from './experts-component/experts.component';
import {ProfileUpdateComponent} from './profile-component/profile-update.component';
import {EmployeeUpdateComponent} from './employee-component/employee-update.component';


export const PageRoutes: Routes = [
  {
    path: 'ho-so',
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'chi-tiet/:id',
        component: ProfileUpdateComponent
      },
      {
        path: 'them-moi',
        component: ProfileUpdateComponent
      }
    ]
  },
  {
    path: 'nhan-vien',
    children: [
      {
        path: '',
        component: EmployeeComponent,
      },
      {
        path: 'chi-tiet/:id',
        component: EmployeeUpdateComponent
      },
      {
        path: 'them-moi',
        component: EmployeeUpdateComponent
      }
    ]
  },
  {
    path: 'chuyen-gia',
    component: ExpertsComponent
  },
];
