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

// ========================================================================
export const LOGOUT_USER = '[Auth] Logout';
export const LOGOUT_USER_FAIL = '[Auth] Logout Fail';
export const LOGOUT_USER_SUCCESS = '[Auth] Logout Success';

export class Logout implements Action {
  readonly type = LOGOUT_USER;

  constructor() {
  }
}

export class LogoutFail implements Action {
  readonly type = LOGOUT_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_USER_SUCCESS;

  constructor(public payload: any) {
  }
}

// ========================================================================
// refresh (F5) page => load user
export const LOAD_USER = '[Auth] Load User';
export const LOAD_USER_FAIL = '[Auth] Load User Fail';
export const LOAD_USER_SUCCESS = '[Auth] Load User Success';

export class LoadUser implements Action {
  readonly type = LOAD_USER;

  constructor() {
  }
}

export class LoadUserFail implements Action {
  readonly type = LOAD_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;

  constructor(public payload: any) {
  }
}


export type AuthAction = Login | LoginFail | LoginSuccess
  | Register | RegisterFail | RegisterSuccess
  | Logout | LogoutFail | LogoutSuccess
  | LoadUser | LoadUserFail | LoadUserSuccess;

