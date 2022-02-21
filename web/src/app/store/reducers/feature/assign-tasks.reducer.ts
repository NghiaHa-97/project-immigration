import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromAssignTasksAction from '../../actions/assign-tasks.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface AssignTasksState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: AssignTasksState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromAssignTasksAction.ActionAssignTasks
): AssignTasksState {
  switch (action.type) {
    case fromAssignTasksAction.LOAD_ASSIGN_TASKS_SUCCESS: {
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

    case fromAssignTasksAction.LOAD_DETAIL_ASSIGN_TASKS_SUCCESS:
    case fromAssignTasksAction.UPDATE_ASSIGN_TASKS_SUCCESS:
    case fromAssignTasksAction.CREATE_ASSIGN_TASKS_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entity = action.payload?.data;
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

    case fromAssignTasksAction.REMOVE_ASSIGN_TASKS_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const id = action.payload?.data;
      const {[getPrefixID(id)]: removed, ...entities} = state.entities;

      return {
        ...state,
        entities,
        responseStatus
      };
    }

    case fromAssignTasksAction.LOAD_DETAIL_ASSIGN_TASKS_FAIL:
    case fromAssignTasksAction.CREATE_ASSIGN_TASKS_FAIL:
    case fromAssignTasksAction.UPDATE_ASSIGN_TASKS_FAIL:
    case fromAssignTasksAction.REMOVE_ASSIGN_TASKS_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getAssignTasksEntities = (state: AssignTasksState) => state.entities;
export const getAssignTasksResponseStatus = (state: AssignTasksState) => state.responseStatus;


