import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromWorkUnitAction from '../../actions/work-unit.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface WorkUnitState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: WorkUnitState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromWorkUnitAction.ActionWorkUnit
): WorkUnitState {
  switch (action.type) {
    case fromWorkUnitAction.LOAD_WORK_UNIT_BY_UNIT_TYPE_SUCCESS: {
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

    case fromWorkUnitAction.LOAD_WORK_UNIT_BY_UNIT_TYPE_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getWorkUnitEntities = (state: WorkUnitState) => state.entities;
export const getWorkUnitResponseStatus = (state: WorkUnitState) => state.responseStatus;


