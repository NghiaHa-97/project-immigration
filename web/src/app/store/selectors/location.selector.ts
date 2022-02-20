import {createSelector} from '@ngrx/store';
import {getLocation, getFeaturesState} from '../reducers';
import {
  getLocationEntities,
  getLocationResponseStatus,
  getLocationSearchEntities
} from '../reducers/feature/location.reducer';

export const getLocationState = createSelector(getFeaturesState, getLocation);
export const getLocationEntitiesState = createSelector(getLocationState, getLocationEntities);
export const getArrayLocationState = createSelector(getLocationEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});

export const getLocationSearchEntitiesState = createSelector(getLocationState, getLocationSearchEntities);
export const getArrayLocationSearchState = createSelector(getLocationSearchEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getLocationResponseStatusState = createSelector(getLocationState, getLocationResponseStatus);
