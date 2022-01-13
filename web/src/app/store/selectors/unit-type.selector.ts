import {createSelector} from '@ngrx/store';
import {getUnitType, getFeaturesState} from '../reducers';
import {getUnitTypeEntities, getUnitTypeResponseStatus} from '../reducers/feature/unit-type.reducer';

export const getUnitTypeState = createSelector(getFeaturesState, getUnitType);
export const getUnitTypeEntitiesState = createSelector(getUnitTypeState, getUnitTypeEntities);
export const getArrayUnitTypeState = createSelector(getUnitTypeEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getUnitTypeResponseStatusState = createSelector(getUnitTypeState, getUnitTypeResponseStatus);
