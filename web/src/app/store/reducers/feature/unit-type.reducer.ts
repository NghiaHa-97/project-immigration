import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromUnitTypeAction from '../../actions/unit-type.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface UnitTypeState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: UnitTypeState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromUnitTypeAction.ActionUnitType
): UnitTypeState {
  switch (action.type) {
    case fromUnitTypeAction.LOAD_UNIT_TYPE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entities = action.payload?.data.reduce(
        (result: { [id: string]: any }, item: any) => {
          return {
            ...result,
            [getPrefixID(item.id)]: item,
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

    case fromUnitTypeAction.LOAD_UNIT_TYPE_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getUnitTypeEntities = (state: UnitTypeState) => state.entities;
export const getUnitTypeResponseStatus = (state: UnitTypeState) => state.responseStatus;


