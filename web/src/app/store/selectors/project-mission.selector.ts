import {createSelector} from '@ngrx/store';
import {getProjectMission, getFeaturesState} from '../reducers';
import {getProjectMissionEntities, getProjectMissionResponseStatus} from '../reducers/feature/project-mission.reducer';

export const getProjectMissionState = createSelector(getFeaturesState, getProjectMission);
export const getProjectMissionEntitiesState = createSelector(getProjectMissionState, getProjectMissionEntities);
export const getArrayProjectMissionState = createSelector(getProjectMissionEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getProjectMissionResponseStatusState = createSelector(getProjectMissionState, getProjectMissionResponseStatus);
