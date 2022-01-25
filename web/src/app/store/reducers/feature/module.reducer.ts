import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromModuleAction from '../../actions/module.action';
import {getPrefixID} from '../../../constans/prefix-id.const';
import {buildFileTreeModule, TodoItemNode} from '../../../common-component/tree-checkbox/tree-checkbox.component';

export interface ModuleState {
  entities: { [id: string]: any };
  isLoaded: boolean;
  todoItemNode: TodoItemNode[];
  responseStatus: ResponseStatusModel;
}

export const initialState: ModuleState = {
  entities: {},
  isLoaded: false,
  todoItemNode: [],
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromModuleAction.ActionModule
): ModuleState {
  switch (action.type) {
    case fromModuleAction.LOAD_MODULE_SUCCESS: {
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
      const todoItemNode = buildFileTreeModule(entities, 0);
      return {
        ...state,
        entities,
        isLoaded: true,
        todoItemNode,
        responseStatus
      };
    }

    case fromModuleAction.LOAD_MODULE_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        isLoaded: false,
        todoItemNode: [],
        responseStatus
      };
    }
  }

  return state;
}

export const getModuleEntities = (state: ModuleState) => state.entities;
export const getModuleLoaded = (state: ModuleState) => state.isLoaded;
export const getModuleResponseStatus = (state: ModuleState) => state.responseStatus;
export const getModuleTodoItemNode = (state: ModuleState) => state.todoItemNode;


