import {Action} from '@ngrx/store';

// =========================== load Page
export const LOAD_ROLE = '[ROLE] Load Role';
export const LOAD_ROLE_FAIL = '[ROLE] Load Role Fail';
export const LOAD_ROLE_SUCCESS = '[ROLE] Load Role Success';

export class LoadRole implements Action {
  readonly type = LOAD_ROLE;

  constructor(public payload: any) {
  }
}

export class LoadRoleFail implements Action {
  readonly type = LOAD_ROLE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadRoleSuccess implements Action {
  readonly type = LOAD_ROLE_SUCCESS;

  constructor(public payload: any) {
  }
}


// =========================== load All
export const LOAD_ALL_ROLE = '[ROLE] Load All Role';
export const LOAD_ALL_ROLE_FAIL = '[ROLE] Load All Role Fail';
export const LOAD_ALL_ROLE_SUCCESS = '[ROLE] Load All Role Success';

export class LoadAllRole implements Action {
  readonly type = LOAD_ALL_ROLE;

  constructor(public payload: any) {
  }
}

export class LoadAllRoleFail implements Action {
  readonly type = LOAD_ALL_ROLE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadAllRoleSuccess implements Action {
  readonly type = LOAD_ALL_ROLE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== load DETAIL
export const LOAD_DETAIL_ROLE = '[ROLE] Load Detail Role';
export const LOAD_DETAIL_ROLE_FAIL = '[ROLE] Load Detail Role Fail';
export const LOAD_DETAIL_ROLE_SUCCESS = '[ROLE] Load Detail Role Success';

export class LoadDetailRole implements Action {
  readonly type = LOAD_DETAIL_ROLE;

  constructor(public payload: any) {
  }
}

export class LoadDetailRoleFail implements Action {
  readonly type = LOAD_DETAIL_ROLE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadDetailRoleSuccess implements Action {
  readonly type = LOAD_DETAIL_ROLE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Create
export const CREATE_ROLE = '[ROLE] Create Role';
export const CREATE_ROLE_FAIL = '[ROLE] Create Role Fail';
export const CREATE_ROLE_SUCCESS = '[ROLE] Create Role Success';

export class CreateRole implements Action {
  readonly type = CREATE_ROLE;

  constructor(public payload: any) {
  }
}

export class CreateRoleFail implements Action {
  readonly type = CREATE_ROLE_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateRoleSuccess implements Action {
  readonly type = CREATE_ROLE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Update
export const UPDATE_ROLE = '[ROLE] Update Role';
export const UPDATE_ROLE_FAIL = '[ROLE] Update Role Fail';
export const UPDATE_ROLE_SUCCESS = '[ROLE] Update Role Success';

export class UpdateRole implements Action {
  readonly type = UPDATE_ROLE;

  constructor(public payload: any) {
  }
}

export class UpdateRoleFail implements Action {
  readonly type = UPDATE_ROLE_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateRoleSuccess implements Action {
  readonly type = UPDATE_ROLE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Remove
export const REMOVE_ROLE = '[ROLE] Remove Role';
export const REMOVE_ROLE_FAIL = '[ROLE] Remove Role Fail';
export const REMOVE_ROLE_SUCCESS = '[ROLE] Remove Role Success';

export class RemoveRole implements Action {
  readonly type = REMOVE_ROLE;

  constructor(public payload: any) {
  }
}

export class RemoveRoleFail implements Action {
  readonly type = REMOVE_ROLE_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveRoleSuccess implements Action {
  readonly type = REMOVE_ROLE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionRole = LoadRole | LoadRoleFail | LoadRoleSuccess
  | LoadAllRole | LoadAllRoleFail | LoadAllRoleSuccess
  | LoadDetailRole | LoadDetailRoleFail | LoadDetailRoleSuccess
  | CreateRole | CreateRoleFail | CreateRoleSuccess
  | UpdateRole | UpdateRoleFail | UpdateRoleSuccess
  | RemoveRole | RemoveRoleFail | RemoveRoleSuccess;
