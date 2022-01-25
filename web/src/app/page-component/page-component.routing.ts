import {Routes} from '@angular/router';
import {ProfileComponent} from './profile-component/profile.component';
import {EmployeeComponent} from './employee-component/employee.component';
import {ExpertsComponent} from './experts-component/experts.component';
import {ProfileUpdateComponent} from './profile-component/profile-update.component';
import {EmployeeUpdateComponent} from './employee-component/employee-update.component';
import {EmployeeExistDetailActivate} from './can-activate';
import {ExpertsUpdateComponent} from './experts-component/experts-update.component';
import {MapComponent} from './map-component/map.component';
import {ManageUserComponent} from './manage-user-component/manage-user.component';
import {ManageUserUpdateComponent} from './manage-user-component/manage-user-update.component';


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
        component: EmployeeUpdateComponent,
        canActivate: [EmployeeExistDetailActivate]
      },
      {
        path: 'them-moi',
        component: EmployeeUpdateComponent
      }
    ]
  },
  {
    path: 'chuyen-gia',
    children: [
      {
        path: '',
        component: ExpertsComponent,
      },
      {
        path: 'chi-tiet/:id',
        component: ExpertsUpdateComponent,
        // canActivate: [EmployeeExistDetailActivate]
      },
      {
        path: 'them-moi',
        component: ExpertsUpdateComponent
      }
    ]
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'quan-ly-nguoi-dung',
    children: [
      {
        path: '',
        component: ManageUserComponent,
      },
      {
        path: 'chi-tiet/:id',
        component: ManageUserUpdateComponent,
        // canActivate: [EmployeeExistDetailActivate]
      },
      {
        path: 'them-moi',
        component: ManageUserUpdateComponent
      }
    ]
  },
];
