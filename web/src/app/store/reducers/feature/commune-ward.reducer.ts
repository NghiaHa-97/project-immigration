import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromCommuneWardAction from '../../actions/commune-ward.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface CommuneWardState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: CommuneWardState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromCommuneWardAction.ActionCommuneWard
): CommuneWardState {
  switch (action.type) {
    case fromCommuneWardAction.LOAD_COMMUNE_WARD_BY_DISTRICT_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entities = action.payload?.data.reduce(
        (result: { [id: string]: any }, item: any) => {
          return {
            ...result,
            [getPrefixID(item.id)]: item,
          };
        },
        {
          ...state.entities,
        }
      );

      return {
        ...state,
        entities,
        responseStatus
      };
    }

    case fromCommuneWardAction.LOAD_COMMUNE_WARD_BY_DISTRICT_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getCommuneWardEntities = (state: CommuneWardState) => state.entities;
export const getCommuneWardResponseStatus = (state: CommuneWardState) => state.responseStatus;


