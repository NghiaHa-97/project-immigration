import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromPositionAction from '../../actions/position.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface PositionState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: PositionState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromPositionAction.ActionPosition
): PositionState {
  switch (action.type) {
    case fromPositionAction.LOAD_POSITION_BY_DEPARTMENT_SUCCESS: {
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

    case fromPositionAction.LOAD_POSITION_BY_DEPARTMENT_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getPositionEntities = (state: PositionState) => state.entities;
export const getPositionResponseStatus = (state: PositionState) => state.responseStatus;


