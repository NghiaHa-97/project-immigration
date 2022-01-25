import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromEmployee from './feature/employee.reducer';
import * as fromExperts from './feature/experts.reducer';
import * as fromProfile from './feature/profile.reducer';

import * as fromCityProvince from './feature/city-province.reducer';
import * as fromCommuneWard from './feature/commune-ward.reducer';
import * as fromDepartment from './feature/department.reducer';
import * as fromDistrict from './feature/district.reducer';
import * as fromPosition from './feature/position.reducer';
import * as fromUnitType from './feature/unit-type.reducer';
import * as fromWorkUnit from './feature/work-unit.reducer';

import * as fromVehicle from './feature/vehicle.reducer';
import * as fromRole from './feature/role.reducer';
import * as fromModule from './feature/module.reducer';

import * as fromManageUser from './feature/manage-user.reducer';


export interface FeatureState {
  employee: fromEmployee.EmployeeState;
  experts: fromExperts.ExpertsState;
  profile: fromProfile.ProfileState;

  cityProvince: fromCityProvince.CityProvinceState;
  communeWard: fromCommuneWard.CommuneWardState;
  department: fromDepartment.DepartmentState;
  district: fromDistrict.DistrictState;
  position: fromPosition.PositionState;
  unitType: fromUnitType.UnitTypeState;
  workUnit: fromWorkUnit.WorkUnitState;
  vehicle: fromVehicle.VehicleState;
  role: fromRole.RoleState;
  module: fromModule.ModuleState;

  manageUser: fromManageUser.ManageUserState;
}

export const featuresReducers: ActionReducerMap<FeatureState, any> = {
  employee: fromEmployee.reducer,
  experts: fromExperts.reducer,
  profile: fromProfile.reducer,

  cityProvince: fromCityProvince.reducer,
  communeWard: fromCommuneWard.reducer,
  department: fromDepartment.reducer,
  district: fromDistrict.reducer,
  position: fromPosition.reducer,
  unitType: fromUnitType.reducer,
  workUnit: fromWorkUnit.reducer,
  vehicle: fromVehicle.reducer,
  role: fromRole.reducer,
  module: fromModule.reducer,

  manageUser: fromManageUser.reducer
};

export const getFeaturesState = createFeatureSelector<FeatureState>(
  'features'
);

export const getEmployee = (state: FeatureState) => state.employee;
export const getExperts = (state: FeatureState) => state.experts;
export const getProfile = (state: FeatureState) => state.profile;


export const getCityProvince = (state: FeatureState) => state.cityProvince;
export const getCommuneWard = (state: FeatureState) => state.communeWard;
export const getDepartment = (state: FeatureState) => state.department;
export const getDistrict = (state: FeatureState) => state.district;
export const getPosition = (state: FeatureState) => state.position;
export const getUnitType = (state: FeatureState) => state.unitType;
export const getWorkUnit = (state: FeatureState) => state.workUnit;

export const getVehicle = (state: FeatureState) => state.vehicle;
export const getRole = (state: FeatureState) => state.role;
export const getModule = (state: FeatureState) => state.module;

export const getManageUser = (state: FeatureState) => state.manageUser;
