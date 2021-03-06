import {EmployeeService} from './employee.service';
import {ExpertsService} from './experts.service';
import {ProfileService} from './profile.service';
import {AuthService} from './auth.service';
import {CityProvinceService} from './city-province.service';
import {CommuneWardService} from './commune-ward.service';
import {DepartmentService} from './department.service';
import {DistrictService} from './district.service';
import {UnitTypeService} from './unit-type.service';
import {WorkUnitService} from './work-unit.service';
import {PositionService} from './position.service';
import {ModuleService} from './module.service';
import {VehicleService} from './vehicle.service';
import {RoleService} from './role.service';
import {ManageUserService} from './manage-user.service';
import {StatusProfileService} from './status-profile.service';
import {ProjectMissionService} from './project-mission.service';
import {CountryService} from './country.service';
import {LocationService} from './location.service';
import {ObjectTypeService} from './object-type.service';
import {AssignTasksService} from './assign-tasks.service';
import {CommentService} from './comment.service';

export * from './auth.service';
export * from './profile.service';
export * from './employee.service';
export * from './experts.service';

export * from './city-province.service';
export * from './commune-ward.service';
export * from './department.service';
export * from './district.service';
export * from './position.service';
export * from './unit-type.service';
export * from './work-unit.service';
export * from './vehicle.service';
export * from './role.service';
export * from './module.service';

export * from './manage-user.service';
export * from './status-profile.service';
export * from './project-mission.service';
export * from './country.service';

export * from './location.service';
export * from './object-type.service';

export * from './assign-tasks.service';
export * from './comment.service';

export const pageComponentService = [
  EmployeeService,
  ExpertsService,
  ProfileService,
  CityProvinceService,
  CommuneWardService,
  DepartmentService,
  DistrictService,
  PositionService,
  UnitTypeService,
  WorkUnitService,
  ModuleService,
  VehicleService,
  RoleService,
  ManageUserService,
  StatusProfileService,
  ProjectMissionService,
  CountryService,
  LocationService,
  ObjectTypeService,
  AssignTasksService,
  CommentService
];
export const appComponentService = [AuthService];
