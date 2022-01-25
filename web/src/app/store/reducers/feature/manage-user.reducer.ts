import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromManageUserAction from '../../actions/manage-user.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface ManageUserState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: ManageUserState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromManageUserAction.ActionManageUser
): ManageUserState {
  switch (action.type) {
    case fromManageUserAction.LOAD_MANAGE_USER_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entities = action.payload.data.reduce(
        (result: { [id: string]: any }, item: any) => {
          return {
            ...result,
            [getPrefixID(item.id)]: {...item, isDetail: false},
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

    case fromManageUserAction.LOAD_DETAIL_MANAGE_USER_SUCCESS:
    case fromManageUserAction.UPDATE_MANAGE_USER_SUCCESS:
    case fromManageUserAction.CREATE_MANAGE_USER_SUCCESS: {
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

    case fromManageUserAction.REMOVE_MANAGE_USER_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const employeeID = action.payload?.data;
      const {[getPrefixID(employeeID)]: removed, ...entities} = state.entities;

      return {
        ...state,
        entities,
        responseStatus
      };
    }
    case fromManageUserAction.LOAD_MANAGE_USER_FAIL:
    case fromManageUserAction.LOAD_DETAIL_MANAGE_USER_FAIL:
    case fromManageUserAction.CREATE_MANAGE_USER_FAIL:
    case fromManageUserAction.UPDATE_MANAGE_USER_FAIL:
    case fromManageUserAction.REMOVE_MANAGE_USER_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getManageUserEntities = (state: ManageUserState) => state.entities;
export const getManageUserResponseStatus = (state: ManageUserState) => state.responseStatus;


