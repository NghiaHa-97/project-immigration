import {createSelector} from '@ngrx/store';
import {getFeaturesState, getProfile} from '../reducers';
import {getProfileEntities, getProfileResponseStatus} from '../reducers/feature/profile.reducer';

export const getProfileState = createSelector(getFeaturesState, getProfile);
export const getProfileEntitiesState = createSelector(getProfileState, getProfileEntities);
export const getArrayProfileState = createSelector(getProfileEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getProfileResponseStatusState = createSelector(getProfileState, getProfileResponseStatus);
