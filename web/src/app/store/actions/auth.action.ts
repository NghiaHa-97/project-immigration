import {Action} from '@ngrx/store';

export const LOGIN_USER = '[Auth] Login';
export const LOGIN_USER_FAIL = '[Auth] Login Fail';
export const LOGIN_USER_SUCCESS = '[Auth] Login Success';

export class Login implements Action {
  readonly type = LOGIN_USER;

  constructor(public payload: any) {
  }
}

export class LoginFail implements Action {
  readonly type = LOGIN_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_USER_SUCCESS;

  constructor(public payload: any) {
  }
}

// ========================================================================
export const REGISTER_USER = '[Auth] Register';
export const REGISTER_USER_FAIL = '[Auth] Register Fail';
export const REGISTER_USER_SUCCESS = '[Auth] Register Success';

export class Register implements Action {
  readonly type = REGISTER_USER;

  constructor(public payload: any) {
  }
}

export class RegisterFail implements Action {
  readonly type = REGISTER_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_USER_SUCCESS;

  constructor(public payload: any) {
  }
}

export type AuthAction = Login | LoginFail | LoginSuccess | Register | RegisterFail | RegisterSuccess;

