import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromRoleAction from '../../actions/role.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface RoleState {
  entities: { [id: string]: any };
  entitiesAll: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: RoleState = {
  entities: {},
  entitiesAll: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromRoleAction.ActionRole
): RoleState {
  switch (action.type) {
    case fromRoleAction.LOAD_ROLE_SUCCESS: {
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

    case fromRoleAction.LOAD_ALL_ROLE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entitiesAll = action.payload.data.reduce(
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
        entitiesAll,
        responseStatus
      };
    }

    case fromRoleAction.LOAD_DETAIL_ROLE_SUCCESS:
    case fromRoleAction.UPDATE_ROLE_SUCCESS:
    case fromRoleAction.CREATE_ROLE_SUCCESS: {
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

    case fromRoleAction.REMOVE_ROLE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const employeeID = action.payload?.data;
      const {[getPrefixID(employeeID)]: removed, ...entities} = state.entities;

      return {
        ...state,
        entities,
        responseStatus
      };
    }
    case fromRoleAction.LOAD_ALL_ROLE_FAIL:
    case fromRoleAction.LOAD_DETAIL_ROLE_FAIL:
    case fromRoleAction.CREATE_ROLE_FAIL:
    case fromRoleAction.UPDATE_ROLE_FAIL:
    case fromRoleAction.REMOVE_ROLE_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getRoleEntities = (state: RoleState) => state.entities;
export const getRoleEntitiesAll = (state: RoleState) => state.entitiesAll;
export const getRoleResponseStatus = (state: RoleState) => state.responseStatus;


