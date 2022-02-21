import {RouterEffects} from './router.effect';
import {AuthEffect} from './auth.effect';
import {EmployeeEffect} from './employee.effect';
import {ExpertsEffect} from './experts.effect';
import {ProfileEffect} from './profile.effect';
import {CityProvinceEffect} from './city-province.effect';
import {DistrictEffect} from './district.effect';
import {CommuneWardEffect} from './commune-ward.effect';
import {UnitTypeEffect} from './unit-type.effect';
import {WorkUnitEffect} from './work-unit.effect';
import {DepartmentEffect} from './department.effect';
import {PositionEffect} from './position.effect';
import {VehicleEffect} from './vehicle.effect';
import {RoleEffect} from './role.effect';
import {ModuleEffect} from './module.effect';
import {ManageUserEffect} from './manage-user.effect';
import {StatusProfileEffect} from './status-profile.effect';
import {ProjectMissionEffect} from './project-mission.effect';
import {CountryEffect} from './country.effect';
import {LocationEffect} from './location.effect';
import {ObjectTypeEffect} from './object-type.effect';
import {CommentEffect} from './comment.effect';
import {AssignTasksService} from '../../services';


// export {VehicleEffect} from './vehicle.effect';
// export {RoleEffect} from './role.effect';
// export {ModuleEffect} from './module.effect';

export const effectsRoot: any[] = [RouterEffects, AuthEffect];
export const effectsFeatures: any[] = [
  EmployeeEffect,
  ExpertsEffect,
  ProfileEffect,
  CityProvinceEffect,
  DistrictEffect,
  CommuneWardEffect,
  UnitTypeEffect,
  WorkUnitEffect,
  DepartmentEffect,
  PositionEffect,
  VehicleEffect,
  RoleEffect,
  ModuleEffect,
  ManageUserEffect,
  StatusProfileEffect,
  ProjectMissionEffect,
  CountryEffect,
  LocationEffect,
  ObjectTypeEffect,
  CommentEffect,
  AssignTasksService
];

export * from './router.effect';
