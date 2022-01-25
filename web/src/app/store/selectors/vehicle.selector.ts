import {createSelector} from '@ngrx/store';
import {getFeaturesState, getVehicle} from '../reducers';
import {getVehicleEntities, getVehicleLoaded, getVehicleResponseStatus} from '../reducers/feature/vehicle.reducer';

export const getVehicleState = createSelector(getFeaturesState, getVehicle);
export const getVehicleEntitiesState = createSelector(getVehicleState, getVehicleEntities);
export const getArrayVehicleState = createSelector(getVehicleEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});
export const getVehicleLoadedState = createSelector(getVehicleState, getVehicleLoaded);
export const getVehicleResponseStatusState = createSelector(getVehicleState, getVehicleResponseStatus);

