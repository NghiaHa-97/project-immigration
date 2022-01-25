import {createSelector} from '@ngrx/store';
import {getFeaturesState, getModule} from '../reducers';
import {
  getModuleEntities,
  getModuleLoaded,
  getModuleResponseStatus,
  getModuleTodoItemNode
} from '../reducers/feature/module.reducer';

export const getModuleState = createSelector(getFeaturesState, getModule);
export const getModuleEntitiesState = createSelector(getModuleState, getModuleEntities);
export const getModuleLoadedState = createSelector(getModuleState, getModuleLoaded);
export const getModuleTodoItemNodeState = createSelector(getModuleState, getModuleTodoItemNode);
export const getModuleResponseStatusState = createSelector(getModuleState, getModuleResponseStatus);
