import * as fromAuthAction from '../../actions/auth.action';
import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';

export interface AuthState {
  userDetail: any;
  responseStatus: ResponseStatusModel;
}

export const initialState: AuthState = {
  userDetail: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state: AuthState = initialState,
  action: fromAuthAction.AuthAction): AuthState {
  switch (action.type) {

    case fromAuthAction.LOGIN_USER_SUCCESS:
    case fromAuthAction.LOAD_USER_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const userDetail = action.payload.data;
      return {
        ...state,
        userDetail,
        responseStatus
      };
    }
    case fromAuthAction.REGISTER_USER_SUCCESS:
    case fromAuthAction.LOGOUT_USER_SUCCESS: {
      const responseStatus = action.payload;
      return {
        ...state,
        userDetail: null,
        responseStatus
      };
    }
  }
  return state;
}

export const getUserDetail = (state: AuthState) => state.userDetail;
export const getResponseStatus = (state: AuthState) => state.responseStatus;
