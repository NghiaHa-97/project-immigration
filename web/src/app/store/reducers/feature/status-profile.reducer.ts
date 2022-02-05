import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromStatusProfileAction from '../../actions/status-profile.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface StatusProfileState {
  entities: { [id: string]: any };
  isLoaded: boolean;
  responseStatus: ResponseStatusModel;
}

export const initialState: StatusProfileState = {
  entities: {},
  isLoaded: false,
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromStatusProfileAction.ActionStatusProfile
): StatusProfileState {
  switch (action.type) {
    case fromStatusProfileAction.LOAD_STATUS_PROFILE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entities = action.payload?.data.reduce(
        (result: { [id: string]: any }, item: any) => {
          return {
            ...result,
            [getPrefixID(item.id)]: item,
          };
        },
        {}
      );

      return {
        ...state,
        entities,
        isLoaded: true,
        responseStatus
      };
    }

    case fromStatusProfileAction.LOAD_STATUS_PROFILE_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        isLoaded: false,
        responseStatus
      };
    }
  }

  return state;
}

export const getStatusProfileEntities = (state: StatusProfileState) => state.entities;
export const getStatusProfileLoaded = (state: StatusProfileState) => state.isLoaded;
export const getStatusProfileResponseStatus = (state: StatusProfileState) => state.responseStatus;


