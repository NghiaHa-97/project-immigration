import {createSelector} from '@ngrx/store';
import {getWorkUnit, getFeaturesState} from '../reducers';
import {getWorkUnitEntities, getWorkUnitResponseStatus} from '../reducers/feature/work-unit.reducer';

export const getWorkUnitState = createSelector(getFeaturesState, getWorkUnit);
export const getWorkUnitEntitiesState = createSelector(getWorkUnitState, getWorkUnitEntities);
export const getArrayWorkUnitState = createSelector(getWorkUnitEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getWorkUnitResponseStatusState = createSelector(getWorkUnitState, getWorkUnitResponseStatus);
