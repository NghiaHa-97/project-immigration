import {createSelector} from '@ngrx/store';
import {getFeaturesState, getStatusProfile} from '../reducers';
import {
  getStatusProfileEntities,
  getStatusProfileLoaded,
  getStatusProfileResponseStatus
} from '../reducers/feature/status-profile.reducer';

export const getStatusProfileState = createSelector(getFeaturesState, getStatusProfile);
export const getStatusProfileEntitiesState = createSelector(getStatusProfileState, getStatusProfileEntities);
export const getArrayStatusProfileState = createSelector(getStatusProfileEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getStatusProfileLoadedState = createSelector(getStatusProfileState, getStatusProfileLoaded);
export const getStatusProfileResponseStatusState = createSelector(getStatusProfileState, getStatusProfileResponseStatus);

