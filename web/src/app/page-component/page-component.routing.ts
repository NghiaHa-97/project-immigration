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
import {AssignTasksComponent} from './assign-tasks-component/assign-tasks.component';
import {AssignTasksUpdateComponent} from './assign-tasks-component/assign-tasks-update.component';
import {AssignTasksExistDetailActivate} from './can-activate/assign-tasks-exist-detail.activate';
import {HasPermissionActivate} from './can-activate/has-permission.activate';
import {PermissionConst} from '../constans/Permission.const';


export const PageRoutes: Routes = [
  {
    path: 'ho-so',
    children: [
      {
        path: '',
        component: ProfileComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.HoSo.Xem
        }
      },
      {
        path: 'chi-tiet/:id',
        component: ProfileUpdateComponent,
        canActivate: [ProfileExistDetailActivate, HasPermissionActivate],
        data: {
          code: PermissionConst.HoSo.Xem
        }
      },
      {
        path: 'them-moi',
        component: ProfileUpdateComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.HoSo.Xem
        }
      }
    ]
  },
  {
    path: 'nhiem-vu-cong-viec',
    children: [
      {
        path: '',
        component: ProjectMissionComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.DuAnDeAn.Xem
        }
      },
      {
        path: 'chi-tiet/:id',
        component: ProjectMissionUpdateComponent,
        canActivate: [ProjectMissionExistDetailActivate, HasPermissionActivate],
        data: {
          code: PermissionConst.DuAnDeAn.Xem
        }
      },
      {
        path: 'them-moi',
        component: ProjectMissionUpdateComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.DuAnDeAn.Xem
        }
      }
    ]
  },
  {
    path: 'nhan-vien',
    children: [
      {
        path: '',
        component: EmployeeComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.NhanVien.Xem
        }
      },
      {
        path: 'chi-tiet/:id',
        component: EmployeeUpdateComponent,
        canActivate: [EmployeeExistDetailActivate, HasPermissionActivate],
        data: {
          code: PermissionConst.NhanVien.Xem
        }
      },
      {
        path: 'them-moi',
        component: EmployeeUpdateComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.NhanVien.Xem
        }
      }
    ]
  },
  {
    path: 'chuyen-gia',
    children: [
      {
        path: '',
        component: ExpertsComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.ChuyenGia.Xem
        }
      },
      {
        path: 'chi-tiet/:id',
        component: ExpertsUpdateComponent,
        canActivate: [ExpertExistDetailActivate, HasPermissionActivate],
        data: {
          code: PermissionConst.ChuyenGia.Xem
        }
      },
      {
        path: 'them-moi',
        component: ExpertsUpdateComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.ChuyenGia.Xem
        }
      }
    ]
  },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [HasPermissionActivate],
    data: {
      code: PermissionConst.BanDo.Xem
    }
  },
  {
    path: 'quan-ly-nguoi-dung',
    children: [
      {
        path: '',
        component: ManageUserComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.NguoiDung.Xem
        }
      },
      {
        path: 'chi-tiet/:id',
        component: ManageUserUpdateComponent,
        canActivate: [UserCustomerExistDetailActivate, HasPermissionActivate],
        data: {
          code: PermissionConst.NguoiDung.Xem
        }
      },
      {
        path: 'them-moi',
        component: ManageUserUpdateComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.NguoiDung.Xem
        }
      }
    ]
  },
  {
    path: 'quan-ly-vai-tro',
    children: [
      {
        path: '',
        component: RoleComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.VaiTro.Xem
        }
      },
      {
        path: 'chi-tiet/:id',
        component: RoleUpdateComponent,
        canActivate: [HasPermissionActivate, RoleExistDetailActivate],
        canDeactivate: [RoleDeactivate],
        data: {
          code: PermissionConst.VaiTro.Xem
        }
      },
      {
        path: 'them-moi',
        component: RoleUpdateComponent,
        canDeactivate: [RoleDeactivate],
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.VaiTro.Xem
        }
      }
    ]
  },
  {
    path: 'nhiem-vu',
    children: [
      {
        path: '',
        component: AssignTasksComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.NhiemVu.Xem
        }
      },
      {
        path: 'chi-tiet/:id',
        component: AssignTasksUpdateComponent,
        canActivate: [AssignTasksExistDetailActivate, HasPermissionActivate],
        data: {
          code: PermissionConst.NhiemVu.Xem
        }
      },
      {
        path: 'them-moi',
        component: AssignTasksUpdateComponent,
        canActivate: [HasPermissionActivate],
        data: {
          code: PermissionConst.NhiemVu.Xem
        }
      }
    ]
  }
];
