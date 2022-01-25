import {createSelector} from '@ngrx/store';
import {getManageUser, getFeaturesState} from '../reducers';
import {getManageUserEntities, getManageUserResponseStatus} from '../reducers/feature/manage-user.reducer';

export const getManageUserState = createSelector(getFeaturesState, getManageUser);
export const getManageUserEntitiesState = createSelector(getManageUserState, getManageUserEntities);
export const getArrayManageUserState = createSelector(getManageUserEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getManageUserResponseStatusState = createSelector(getManageUserState, getManageUserResponseStatus);
