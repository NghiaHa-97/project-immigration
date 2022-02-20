import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromObjectTypeAction from '../../actions/object-type.action';
import {getPrefixID} from '../../../constans/prefix-id.const';
import {DOMAIN_SERVER} from '../../../constans/url-api.const';

export interface ObjectTypeState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: ObjectTypeState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromObjectTypeAction.ActionObjectType
): ObjectTypeState {
  switch (action.type) {
    case fromObjectTypeAction.LOAD_OBJECT_TYPE_SUCCESS: {
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

    case fromObjectTypeAction.SAVE_OBJECT_TYPE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entity = action.payload.data;
      const entities = {
        ...state.entities,
        [getPrefixID(entity.id)]: {...entity},
      };

      return {
        ...state,
        entities,
        responseStatus
      };
    }

    case fromObjectTypeAction.REMOVE_OBJECT_TYPE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const id = action.payload.data;
      const {[getPrefixID(id)]: removed1, ...entities} = state.entities;

      return {
        ...state,
        entities,
        responseStatus
      };
    }


    case fromObjectTypeAction.SAVE_OBJECT_TYPE_FAIL:
    case fromObjectTypeAction.REMOVE_OBJECT_TYPE_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getObjectTypeEntities = (state: ObjectTypeState) => state.entities;
export const getObjectTypeResponseStatus = (state: ObjectTypeState) => state.responseStatus;
