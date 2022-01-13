import {createSelector} from '@ngrx/store';
import {getExperts, getFeaturesState} from '../reducers';
import {getExpertsEntities, getExpertsResponseStatus} from '../reducers/feature/experts.reducer';


export const getExpertsState = createSelector(getFeaturesState, getExperts);
export const getExpertsEntitiesState = createSelector(getExpertsState, getExpertsEntities);
export const getArrayExpertsState = createSelector(getExpertsEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getExpertsResponseStatusState = createSelector(getExpertsState, getExpertsResponseStatus);
