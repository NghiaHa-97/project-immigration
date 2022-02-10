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
import {RoleComponent} from './role-component/role.component';
import {RoleUpdateComponent} from './role-component/role-update.component';
import {RoleExistDetailActivate} from './can-activate/role-exist-detail.activate';
import {RoleDeactivate} from './can-deactivate/role.deactivate';
import {UserCustomerExistDetailActivate} from './can-activate/user-customer-exist-detail.activate';
import {ProjectMissionComponent} from './project-mission-component/project-mission.component';
import {ProjectMissionUpdateComponent} from './project-mission-component/project-mission-update.component';
import {ProjectMissionExistDetailActivate} from './can-activate/project-mission-exist-detail.activate';
import {ExpertExistDetailActivate} from './can-activate/expert-exist-detail.activate';
import {ProfileExistDetailActivate} from './can-activate/profile-exist-detail.activate';


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
        component: ProfileUpdateComponent,
        canActivate: [ProfileExistDetailActivate]
      },
      {
        path: 'them-moi',
        component: ProfileUpdateComponent
      }
    ]
  },
  {
    path: 'nhiem-vu-cong-viec',
    children: [
      {
        path: '',
        component: ProjectMissionComponent,
      },
      {
        path: 'chi-tiet/:id',
        component: ProjectMissionUpdateComponent,
        canActivate: [ProjectMissionExistDetailActivate]
      },
      {
        path: 'them-moi',
        component: ProjectMissionUpdateComponent
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
        canActivate: [ExpertExistDetailActivate]
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
        canActivate: [UserCustomerExistDetailActivate]
      },
      {
        path: 'them-moi',
        component: ManageUserUpdateComponent
      }
    ]
  },
  {
    path: 'quan-ly-vai-tro',
    children: [
      {
        path: '',
        component: RoleComponent,
      },
      {
        path: 'chi-tiet/:id',
        component: RoleUpdateComponent,
        canActivate: [RoleExistDetailActivate],
        canDeactivate: [RoleDeactivate]
      },
      {
        path: 'them-moi',
        component: RoleUpdateComponent,
        canDeactivate: [RoleDeactivate]
      }
    ]
  },
];
