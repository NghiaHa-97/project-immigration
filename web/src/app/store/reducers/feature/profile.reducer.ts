import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromProfileAction from '../../actions/profile.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface ProfileState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: ProfileState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromProfileAction.ActionProfile
): ProfileState {
  switch (action.type) {
    case fromProfileAction.LOAD_PROFILE_SUCCESS: {
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

    case fromProfileAction.LOAD_DETAIL_PROFILE_SUCCESS:
    case fromProfileAction.UPDATE_PROFILE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const profile = action.payload.data;
      const entities = {
        ...state.entities,
        [getPrefixID(profile.id)]: {...profile, isDetail: true},
      };

      return {
        ...state,
        entities,
        responseStatus
      };
    }
    case fromProfileAction.CREATE_PROFILE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const profile = action.payload.data;
      const entities = {
        ...state.entities,
        [getPrefixID(profile.id)]: {...profile, isDetail: false},
      };

      return {
        ...state,
        entities,
        responseStatus
      };
    }

    case fromProfileAction.REMOVE_PROFILE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const profileID = action.payload.data;
      const {[getPrefixID(profileID)]: removed, ...entities} = state.entities;

      return {
        ...state,
        entities,
        responseStatus
      };
    }
    case fromProfileAction.LOAD_PROFILE_FAIL:
    case fromProfileAction.LOAD_DETAIL_PROFILE_FAIL:
    case fromProfileAction.CREATE_PROFILE_FAIL:
    case fromProfileAction.UPDATE_PROFILE_FAIL:
    case fromProfileAction.REMOVE_PROFILE_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getProfileEntities = (state: ProfileState) => state.entities;
export const getProfileResponseStatus = (state: ProfileState) => state.responseStatus;


