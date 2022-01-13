import {createSelector} from '@ngrx/store';
import {getPosition, getFeaturesState} from '../reducers';
import {getPositionEntities, getPositionResponseStatus} from '../reducers/feature/position.reducer';

export const getPositionState = createSelector(getFeaturesState, getPosition);
export const getPositionEntitiesState = createSelector(getPositionState, getPositionEntities);
export const getArrayPositionState = createSelector(getPositionEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getPositionResponseStatusState = createSelector(getPositionState, getPositionResponseStatus);
