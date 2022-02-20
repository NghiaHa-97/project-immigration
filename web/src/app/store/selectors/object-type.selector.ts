import {createSelector} from '@ngrx/store';
import {getObjectType, getFeaturesState} from '../reducers';
import {
  getObjectTypeEntities,
  getObjectTypeResponseStatus
} from '../reducers/feature/object-type.reducer';
import {DOMAIN_SERVER} from '../../constans/url-api.const';

export const getObjectTypeState = createSelector(getFeaturesState, getObjectType);
export const getObjectTypeEntitiesState = createSelector(getObjectTypeState, getObjectTypeEntities);
export const getArrayObjectTypeState = createSelector(getObjectTypeEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => {
    return {
      ...entities[id], image: `${DOMAIN_SERVER}/${entities[id]?.image}`
    };
  });
});

export const getObjectTypeResponseStatusState = createSelector(getObjectTypeState, getObjectTypeResponseStatus);
