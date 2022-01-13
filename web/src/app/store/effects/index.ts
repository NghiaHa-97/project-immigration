import { RouterEffects } from './router.effect';
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
  PositionEffect
];

export * from './router.effect';
