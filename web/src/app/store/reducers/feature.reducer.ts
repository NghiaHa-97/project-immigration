import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromEmployee from './feature/employee.reducer';
import * as fromExperts from './feature/experts.reducer';
import * as fromProfile from './feature/profile.reducer';

export interface FeatureState {
  employee: fromEmployee.EmployeeState;
  experts: fromExperts.ExpertsState;
  profile: fromProfile.ProfileState;
}

export const featuresReducers: ActionReducerMap<FeatureState, any> = {
  employee: fromEmployee.reducer,
  experts: fromExperts.reducer,
  profile: fromProfile.reducer
};

export const getFeaturesState = createFeatureSelector<FeatureState>(
  'features'
);

export const getEmployee = (state: FeatureState) => state.employee;
export const getExperts = (state: FeatureState) => state.experts;
export const getProfile = (state: FeatureState) => state.profile;
