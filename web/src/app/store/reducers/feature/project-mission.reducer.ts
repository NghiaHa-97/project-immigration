import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromProjectMissionAction from '../../actions/project-mission.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface ProjectMissionState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: ProjectMissionState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromProjectMissionAction.ActionProjectMission
): ProjectMissionState {
  switch (action.type) {
    case fromProjectMissionAction.LOAD_PROJECT_MISSION_SUCCESS: {
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

    case fromProjectMissionAction.LOAD_DETAIL_PROJECT_MISSION_SUCCESS:
    case fromProjectMissionAction.UPDATE_PROJECT_MISSION_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entity = action.payload?.data;
      const entities = {
        ...state.entities,
        [getPrefixID(entity.id)]: {...entity, isDetail: true},
      };

      return {
        ...state,
        entities,
        responseStatus
      };
    }
    case fromProjectMissionAction.CREATE_PROJECT_MISSION_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entity = action.payload?.data;
      const entities = {
        ...state.entities,
        [getPrefixID(entity.id)]: {...entity, isDetail: false},
      };

      return {
        ...state,
        entities,
        responseStatus
      };
    }

    case fromProjectMissionAction.REMOVE_PROJECT_MISSION_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entityID = action.payload?.data;
      const {[getPrefixID(entityID)]: removed, ...entities} = state.entities;

      return {
        ...state,
        entities,
        responseStatus
      };
    }
    case fromProjectMissionAction.LOAD_PROJECT_MISSION_FAIL:
    case fromProjectMissionAction.LOAD_DETAIL_PROJECT_MISSION_FAIL:
    case fromProjectMissionAction.CREATE_PROJECT_MISSION_FAIL:
    case fromProjectMissionAction.UPDATE_PROJECT_MISSION_FAIL:
    case fromProjectMissionAction.REMOVE_PROJECT_MISSION_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getProjectMissionEntities = (state: ProjectMissionState) => state.entities;
export const getProjectMissionResponseStatus = (state: ProjectMissionState) => state.responseStatus;


