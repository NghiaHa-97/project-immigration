import {createSelector} from '@ngrx/store';
import {getEmployee, getFeaturesState} from '../reducers';
import {getEmployeeEntities, getEmployeeResponseStatus} from '../reducers/feature/employee.reducer';

export const getEmployeeState = createSelector(getFeaturesState, getEmployee);
export const getEmployeeEntitiesState = createSelector(getEmployeeState, getEmployeeEntities);
export const getArrayEmployeeState = createSelector(getEmployeeEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getEmployeeResponseStatusState = createSelector(getEmployeeState, getEmployeeResponseStatus);
