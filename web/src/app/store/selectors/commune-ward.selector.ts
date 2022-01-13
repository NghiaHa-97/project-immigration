import {createSelector} from '@ngrx/store';
import {getCommuneWard, getFeaturesState} from '../reducers';
import {getCommuneWardEntities, getCommuneWardResponseStatus} from '../reducers/feature/commune-ward.reducer';

export const getCommuneWardState = createSelector(getFeaturesState, getCommuneWard);
export const getCommuneWardEntitiesState = createSelector(getCommuneWardState, getCommuneWardEntities);
export const getArrayCommuneWardState = createSelector(getCommuneWardEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getCommuneWardResponseStatusState = createSelector(getCommuneWardState, getCommuneWardResponseStatus);
