import {Action} from '@ngrx/store';


// =========================== load
export const LOAD_MANAGE_USER = '[MANAGE_USER] Load UserCustomer';
export const LOAD_MANAGE_USER_FAIL = '[MANAGE_USER] Load UserCustomer Fail';
export const LOAD_MANAGE_USER_SUCCESS = '[MANAGE_USER] Load UserCustomer Success';

export class LoadManageUser implements Action {
  readonly type = LOAD_MANAGE_USER;

  constructor(public payload: any) {
  }
}

export class LoadManageUserFail implements Action {
  readonly type = LOAD_MANAGE_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadManageUserSuccess implements Action {
  readonly type = LOAD_MANAGE_USER_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== load DETAIL
export const LOAD_DETAIL_MANAGE_USER = '[MANAGE_USER] Load Detail UserCustomer';
export const LOAD_DETAIL_MANAGE_USER_FAIL = '[MANAGE_USER] Load Detail UserCustomer Fail';
export const LOAD_DETAIL_MANAGE_USER_SUCCESS = '[MANAGE_USER] Load Detail UserCustomer Success';

export class LoadDetailManageUser implements Action {
  readonly type = LOAD_DETAIL_MANAGE_USER;

  constructor(public payload: any) {
  }
}

export class LoadDetailManageUserFail implements Action {
  readonly type = LOAD_DETAIL_MANAGE_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadDetailManageUserSuccess implements Action {
  readonly type = LOAD_DETAIL_MANAGE_USER_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Create
export const CREATE_MANAGE_USER = '[MANAGE_USER] Create UserCustomer';
export const CREATE_MANAGE_USER_FAIL = '[MANAGE_USER] Create UserCustomer Fail';
export const CREATE_MANAGE_USER_SUCCESS = '[MANAGE_USER] Create UserCustomer Success';

export class CreateManageUser implements Action {
  readonly type = CREATE_MANAGE_USER;

  constructor(public payload: any) {
  }
}

export class CreateManageUserFail implements Action {
  readonly type = CREATE_MANAGE_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateManageUserSuccess implements Action {
  readonly type = CREATE_MANAGE_USER_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Update
export const UPDATE_MANAGE_USER = '[MANAGE_USER] Update UserCustomer';
export const UPDATE_MANAGE_USER_FAIL = '[MANAGE_USER] Update UserCustomer Fail';
export const UPDATE_MANAGE_USER_SUCCESS = '[MANAGE_USER] Update UserCustomer Success';

export class UpdateManageUser implements Action {
  readonly type = UPDATE_MANAGE_USER;

  constructor(public payload: any) {
  }
}

export class UpdateManageUserFail implements Action {
  readonly type = UPDATE_MANAGE_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateManageUserSuccess implements Action {
  readonly type = UPDATE_MANAGE_USER_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Remove
export const REMOVE_MANAGE_USER = '[MANAGE_USER] Remove UserCustomer';
export const REMOVE_MANAGE_USER_FAIL = '[MANAGE_USER] Remove UserCustomer Fail';
export const REMOVE_MANAGE_USER_SUCCESS = '[MANAGE_USER] Remove UserCustomer Success';

export class RemoveManageUser implements Action {
  readonly type = REMOVE_MANAGE_USER;

  constructor(public payload: any) {
  }
}

export class RemoveManageUserFail implements Action {
  readonly type = REMOVE_MANAGE_USER_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveManageUserSuccess implements Action {
  readonly type = REMOVE_MANAGE_USER_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionManageUser = LoadManageUser | LoadManageUserFail | LoadManageUserSuccess
  | LoadDetailManageUser | LoadDetailManageUserFail | LoadDetailManageUserSuccess
  | CreateManageUser | CreateManageUserFail | CreateManageUserSuccess
  | UpdateManageUser | UpdateManageUserFail | UpdateManageUserSuccess
  | RemoveManageUser | RemoveManageUserFail | RemoveManageUserSuccess;
