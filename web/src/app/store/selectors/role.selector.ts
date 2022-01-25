import {createSelector} from '@ngrx/store';
import {getFeaturesState, getRole} from '../reducers';
import {getRoleEntities, getRoleEntitiesAll, getRoleResponseStatus} from '../reducers/feature/role.reducer';

export const getRoleState = createSelector(getFeaturesState, getRole);
export const getRoleEntitiesState = createSelector(getRoleState, getRoleEntities);
export const getArrayRoleState = createSelector(getRoleEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});

export const getRoleEntitiesAllState = createSelector(getRoleState, getRoleEntitiesAll);
export const getArrayRoleAllState = createSelector(getRoleEntitiesAllState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});

export const getRoleResponseStatusState = createSelector(getRoleState, getRoleResponseStatus);
