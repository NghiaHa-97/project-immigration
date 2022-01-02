import {Action} from '@ngrx/store';


// =========================== load
export const LOAD_EXPERTS = '[EXPERTS] Load Experts';
export const LOAD_EXPERTS_FAIL = '[EXPERTS] Load Experts Fail';
export const LOAD_EXPERTS_SUCCESS = '[EXPERTS] Load Experts Success';

export class LoadExperts implements Action {
  readonly type = LOAD_EXPERTS;

  constructor(public payload: any) {
  }
}

export class LoadExpertsFail implements Action {
  readonly type = LOAD_EXPERTS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadExpertsSuccess implements Action {
  readonly type = LOAD_EXPERTS_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== load DETAIL
export const LOAD_DETAIL_EXPERTS = '[EXPERTS] Load Detail Experts';
export const LOAD_DETAIL_EXPERTS_FAIL = '[EXPERTS] Load Detail Experts Fail';
export const LOAD_DETAIL_EXPERTS_SUCCESS = '[EXPERTS] Load Detail Experts Success';

export class LoadDetailExperts implements Action {
  readonly type = LOAD_DETAIL_EXPERTS;

  constructor(public payload: any) {
  }
}

export class LoadDetailExpertsFail implements Action {
  readonly type = LOAD_DETAIL_EXPERTS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadDetailExpertsSuccess implements Action {
  readonly type = LOAD_DETAIL_EXPERTS_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Create
export const CREATE_EXPERTS = '[EXPERTS] Create Experts';
export const CREATE_EXPERTS_FAIL = '[EXPERTS] Create Experts Fail';
export const CREATE_EXPERTS_SUCCESS = '[EXPERTS] Create Experts Success';

export class CreateExperts implements Action {
  readonly type = CREATE_EXPERTS;

  constructor(public payload: any) {
  }
}

export class CreateExpertsFail implements Action {
  readonly type = CREATE_EXPERTS_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateExpertsSuccess implements Action {
  readonly type = CREATE_EXPERTS_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Update
export const UPDATE_EXPERTS = '[EXPERTS] Update Experts';
export const UPDATE_EXPERTS_FAIL = '[EXPERTS] Update Experts Fail';
export const UPDATE_EXPERTS_SUCCESS = '[EXPERTS] Update Experts Success';

export class UpdateExperts implements Action {
  readonly type = UPDATE_EXPERTS;

  constructor(public payload: any) {
  }
}

export class UpdateExpertsFail implements Action {
  readonly type = UPDATE_EXPERTS_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateExpertsSuccess implements Action {
  readonly type = UPDATE_EXPERTS_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Remove
export const REMOVE_EXPERTS = '[EXPERTS] Remove Experts';
export const REMOVE_EXPERTS_FAIL = '[EXPERTS] Remove Experts Fail';
export const REMOVE_EXPERTS_SUCCESS = '[EXPERTS] Remove Experts Success';

export class RemoveExperts implements Action {
  readonly type = REMOVE_EXPERTS;

  constructor(public payload: any) {
  }
}

export class RemoveExpertsFail implements Action {
  readonly type = REMOVE_EXPERTS_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveExpertsSuccess implements Action {
  readonly type = REMOVE_EXPERTS_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionExperts = LoadExperts | LoadExpertsFail | LoadExpertsSuccess
  | LoadDetailExperts | LoadDetailExpertsFail | LoadDetailExpertsSuccess
  | CreateExperts | CreateExpertsFail | CreateExpertsSuccess
  | UpdateExperts | UpdateExpertsFail | UpdateExpertsSuccess
  | RemoveExperts | RemoveExpertsFail | RemoveExpertsSuccess;
