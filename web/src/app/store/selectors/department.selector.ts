import {createSelector} from '@ngrx/store';
import {getDepartment, getFeaturesState} from '../reducers';
import {getDepartmentEntities, getDepartmentResponseStatus} from '../reducers/feature/department.reducer';


export const getDepartmentState = createSelector(getFeaturesState, getDepartment);
export const getDepartmentEntitiesState = createSelector(getDepartmentState, getDepartmentEntities);
export const getArrayDepartmentState = createSelector(getDepartmentEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getDepartmentResponseStatusState = createSelector(getDepartmentState, getDepartmentResponseStatus);
