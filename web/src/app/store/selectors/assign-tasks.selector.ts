import {createSelector} from '@ngrx/store';
import {getFeaturesState, getAssignTasks} from '../reducers';
import {getAssignTasksEntities, getAssignTasksResponseStatus} from '../reducers/feature/assign-tasks.reducer';

export const getAssignTasksState = createSelector(getFeaturesState, getAssignTasks);
export const getAssignTasksEntitiesState = createSelector(getAssignTasksState, getAssignTasksEntities);
export const getArrayAssignTasksState = createSelector(getAssignTasksEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});


export const getAssignTasksResponseStatusState = createSelector(getAssignTasksState, getAssignTasksResponseStatus);
