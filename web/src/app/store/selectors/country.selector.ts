import {createSelector} from '@ngrx/store';
import {getFeaturesState, getCountry} from '../reducers';
import {
  getCountryEntities,
  getCountryLoaded,
  getCountryResponseStatus
} from '../reducers/feature/country.reducer';

export const getCountryState = createSelector(getFeaturesState, getCountry);
export const getCountryEntitiesState = createSelector(getCountryState, getCountryEntities);
export const getArrayCountryState = createSelector(getCountryEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});

export const getCountryLoadedState = createSelector(getCountryState, getCountryLoaded);
export const getCountryResponseStatusState = createSelector(getCountryState, getCountryResponseStatus);
