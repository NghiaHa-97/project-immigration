import * as fromAuthAction from '../actions/auth.action';

export interface AuthState {
  userDetail: any;
}

export const initialState: AuthState = {
  userDetail: {}
};

export function reducer(
  state: AuthState = initialState,
  action: fromAuthAction.AuthAction): AuthState {
  switch (action.type) {

    case fromAuthAction.LOGIN_USER_SUCCESS:
    case fromAuthAction.LOAD_USER_SUCCESS: {
      const userDetail = action.payload;
      return {...state, userDetail};
    }

    case fromAuthAction.LOGOUT_USER_SUCCESS: {
      return {...state, userDetail: null};
    }
  }
  return state;
}

export const getUserDetail = (state: AuthState) => state.userDetail;
