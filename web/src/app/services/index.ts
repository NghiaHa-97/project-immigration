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
  WorkUnitService
];
export const appComponentService = [AuthService];
