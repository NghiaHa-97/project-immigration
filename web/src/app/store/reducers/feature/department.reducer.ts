import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromDepartmentAction from '../../actions/department.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface DepartmentState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: DepartmentState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromDepartmentAction.ActionDepartment
): DepartmentState {
  switch (action.type) {
    case fromDepartmentAction.LOAD_DEPARTMENT_BY_WORK_UNIT_SUCCESS: {
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

    case fromDepartmentAction.LOAD_DEPARTMENT_BY_WORK_UNIT_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getDepartmentEntities = (state: DepartmentState) => state.entities;
export const getDepartmentResponseStatus = (state: DepartmentState) => state.responseStatus;


