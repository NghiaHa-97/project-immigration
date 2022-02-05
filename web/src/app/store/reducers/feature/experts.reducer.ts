import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromExpertsAction from '../../actions/experts.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface ExpertsState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: ExpertsState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromExpertsAction.ActionExperts
): ExpertsState {
  switch (action.type) {
    case fromExpertsAction.LOAD_EXPERTS_SUCCESS: {
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

    case fromExpertsAction.UPDATE_EXPERTS_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const experts = action.payload.data;
      const entities = {
        ...state.entities,
        [getPrefixID(experts.id)]: {...experts, isDetail: true},
      };

      return {
        ...state,
        entities,
        responseStatus
      };
    }
    case fromExpertsAction.CREATE_EXPERTS_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const experts = action.payload.data;
      const entities = {
        ...state.entities,
        [getPrefixID(experts.id)]: {...experts, isDetail: false},
      };

      return {
        ...state,
        entities,
        responseStatus
      };
    }

    case fromExpertsAction.REMOVE_EXPERTS_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const expertsID = action.payload.data;
      const {[getPrefixID(expertsID)]: removed, ...entities} = state.entities;

      return {
        ...state,
        entities,
        responseStatus
      };
    }
    case fromExpertsAction.LOAD_EXPERTS_FAIL:
    case fromExpertsAction.LOAD_DETAIL_EXPERTS_FAIL:
    case fromExpertsAction.CREATE_EXPERTS_FAIL:
    case fromExpertsAction.UPDATE_EXPERTS_FAIL:
    case fromExpertsAction.REMOVE_EXPERTS_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getExpertsEntities = (state: ExpertsState) => state.entities;
export const getExpertsResponseStatus = (state: ExpertsState) => state.responseStatus;
