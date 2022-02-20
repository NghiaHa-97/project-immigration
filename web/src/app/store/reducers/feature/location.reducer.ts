import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromLocationAction from '../../actions/location.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface LocationState {
  entities: { [id: string]: any };
  searchEntities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: LocationState = {
  entities: {},
  searchEntities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromLocationAction.ActionLocation
): LocationState {
  switch (action.type) {
    case fromLocationAction.LOAD_PAGE_LOCATION_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const searchEntities = action.payload.data.reduce(
        (result: { [id: string]: any }, item: any) => {
          return {
            ...result,
            [getPrefixID(item.id)]: {...item},
          };
        },
        {}
      );

      return {
        ...state,
        searchEntities,
        responseStatus
      };
    }
    case fromLocationAction.LOAD_VIEW_LOCATION_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entities = action.payload.data.reduce(
        (result: { [id: string]: any }, item: any) => {
          return {
            ...result,
            [getPrefixID(item.id)]: {...item},
          };
        },
        {}
      );

      return {
        ...state,
        entities,
        responseStatus
      };
    }
    case fromLocationAction.LOAD_LOCATION_DETAIL_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entity = action.payload.data;
      let {entities} = {...state};
      entities = {...entities, [getPrefixID(entity?.id)]: {...entity}};
      return {
        ...state,
        entities,
        responseStatus
      };
    }

    case fromLocationAction.SAVE_LOCATION_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entity = action.payload.data;
      let {entities, searchEntities} = {...state};
      entities = {...entities, [getPrefixID(entity?.id)]: {...entity}};
      if (state.searchEntities && state.searchEntities.hasOwnProperty(getPrefixID(entity?.id))) {
        searchEntities = {...searchEntities, [getPrefixID(entity?.id)]: {...entity}};
      }

      return {
        ...state,
        entities,
        searchEntities,
        responseStatus
      };
    }

    case fromLocationAction.REMOVE_LOCATION_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const id = action.payload.data;
      const {[getPrefixID(id)]: removed1, ...entities} = state.entities;
      const {[getPrefixID(id)]: removed2, ...searchEntities} = state.searchEntities;
      return {
        ...state,
        entities,
        searchEntities,
        responseStatus
      };
    }


    case fromLocationAction.SAVE_LOCATION_FAIL:
    case fromLocationAction.REMOVE_LOCATION_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getLocationEntities = (state: LocationState) => state.entities;
export const getLocationSearchEntities = (state: LocationState) => state.searchEntities;
export const getLocationResponseStatus = (state: LocationState) => state.responseStatus;
