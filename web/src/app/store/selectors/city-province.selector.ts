import {createSelector} from '@ngrx/store';
import {getCityProvince, getFeaturesState} from '../reducers';
import {getCityProvinceEntities, getCityProvinceResponseStatus} from '../reducers/feature/city-province.reducer';

export const getCityProvinceState = createSelector(getFeaturesState, getCityProvince);
export const getCityProvinceEntitiesState = createSelector(getCityProvinceState, getCityProvinceEntities);
export const getArrayCityProvinceState = createSelector(getCityProvinceEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getCityProvinceResponseStatusState = createSelector(getCityProvinceState, getCityProvinceResponseStatus);
