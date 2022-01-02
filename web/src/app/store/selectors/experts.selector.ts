import {createSelector} from '@ngrx/store';
import {getExperts, getFeaturesState} from '../reducers';
import {getExpertsEntities, getExpertsResponseStatus} from '../reducers/feature/experts.reducer';

export const getExpertsState = createSelector(getFeaturesState, getExperts);
export const getExpertsEntitiesState = createSelector(getExpertsState, getExpertsEntities);
export const getExpertsResponseStatusState = createSelector(getExpertsState, getExpertsResponseStatus);
