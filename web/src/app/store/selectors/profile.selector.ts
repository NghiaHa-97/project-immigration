import {createSelector} from '@ngrx/store';
import {getFeaturesState, getProfile} from '../reducers';
import {getProfileEntities, getProfileResponseStatus} from '../reducers/feature/profile.reducer';

export const getProfileState = createSelector(getFeaturesState, getProfile);
export const getProfileEntitiesState = createSelector(getProfileState, getProfileEntities);
export const getProfileResponseStatusState = createSelector(getProfileState, getProfileResponseStatus);
