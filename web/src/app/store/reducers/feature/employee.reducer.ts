import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromEmployeeAction from '../../actions/employee.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface EmployeeState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: EmployeeState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromEmployeeAction.ActionEmployee
): EmployeeState {
  switch (action.type) {
    case fromEmployeeAction.LOAD_EMPLOYEE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entities = action.payload.data.reduce(
        (result: { [id: string]: any }, item: any) => {
          return {
            ...result,
            [getPrefixID(item.id)]: {...item, isDetail: false},
          };
        },
        {}
        // {
        //   ...state.entities,
        // }
      );

      return {
        ...state,
        entities,
        responseStatus
      };
    }

    case fromEmployeeAction.LOAD_DETAIL_EMPLOYEE_SUCCESS:
    case fromEmployeeAction.UPDATE_EMPLOYEE_SUCCESS:
    case fromEmployeeAction.CREATE_EMPLOYEE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const employee = action.payload?.data;
      const entities = {
        ...state.entities,
        [getPrefixID(employee.id)]: {...employee, isDetail: true},
      };

      return {
        ...state,
        entities,
        responseStatus
      };
    }

    case fromEmployeeAction.REMOVE_EMPLOYEE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const employeeID = action.payload?.data;
      const {[getPrefixID(employeeID)]: removed, ...entities} = state.entities;

      return {
        ...state,
        entities,
        responseStatus
      };
    }
    case fromEmployeeAction.LOAD_EMPLOYEE_FAIL:
    case fromEmployeeAction.LOAD_DETAIL_EMPLOYEE_FAIL:
    case fromEmployeeAction.CREATE_EMPLOYEE_FAIL:
    case fromEmployeeAction.UPDATE_EMPLOYEE_FAIL:
    case fromEmployeeAction.REMOVE_EMPLOYEE_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getEmployeeEntities = (state: EmployeeState) => state.entities;
export const getEmployeeResponseStatus = (state: EmployeeState) => state.responseStatus;


