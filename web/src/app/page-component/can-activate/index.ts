import {EmployeeExistDetailActivate} from './employee-exist-detail.activate';
import {RoleExistDetailActivate} from './role-exist-detail.activate';
import {UserCustomerExistDetailActivate} from './user-customer-exist-detail.activate';
import {ProjectMissionExistDetailActivate} from './project-mission-exist-detail.activate';
import {ExpertExistDetailActivate} from './expert-exist-detail.activate';
import {ProfileExistDetailActivate} from './profile-exist-detail.activate';
import {AssignTasksExistDetailActivate} from './assign-tasks-exist-detail.activate';
import {HasPermissionActivate} from './has-permission.activate';


export * from './employee-exist-detail.activate';

export const canActivate = [
  EmployeeExistDetailActivate,
  RoleExistDetailActivate,
  UserCustomerExistDetailActivate,
  ProjectMissionExistDetailActivate,
  ExpertExistDetailActivate,
  ProfileExistDetailActivate,
  AssignTasksExistDetailActivate,
  HasPermissionActivate
];
