import {createSelector} from '@ngrx/store';
import {getDistrict, getFeaturesState} from '../reducers';
import {getDistrictEntities, getDistrictResponseStatus} from '../reducers/feature/district.reducer';

export const getDistrictState = createSelector(getFeaturesState, getDistrict);
export const getDistrictEntitiesState = createSelector(getDistrictState, getDistrictEntities);
export const getArrayDistrictState = createSelector(getDistrictEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getDistrictResponseStatusState = createSelector(getDistrictState, getDistrictResponseStatus);
