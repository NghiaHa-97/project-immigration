import {Action} from '@ngrx/store';


// =========================== load
export const LOAD_PROFILE = '[PROFILE] Load Profile';
export const LOAD_PROFILE_FAIL = '[PROFILE] Load Profile Fail';
export const LOAD_PROFILE_SUCCESS = '[PROFILE] Load Profile Success';

export class LoadProfile implements Action {
  readonly type = LOAD_PROFILE;

  constructor(public payload: any) {
  }
}

export class LoadProfileFail implements Action {
  readonly type = LOAD_PROFILE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadProfileSuccess implements Action {
  readonly type = LOAD_PROFILE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== load DETAIL
export const LOAD_DETAIL_PROFILE = '[PROFILE] Load Detail Profile';
export const LOAD_DETAIL_PROFILE_FAIL = '[PROFILE] Load Detail Profile Fail';
export const LOAD_DETAIL_PROFILE_SUCCESS = '[PROFILE] Load Detail Profile Success';

export class LoadDetailProfile implements Action {
  readonly type = LOAD_DETAIL_PROFILE;

  constructor(public payload: any) {
  }
}

export class LoadDetailProfileFail implements Action {
  readonly type = LOAD_DETAIL_PROFILE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadDetailProfileSuccess implements Action {
  readonly type = LOAD_DETAIL_PROFILE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Create
export const CREATE_PROFILE = '[PROFILE] Create Profile';
export const CREATE_PROFILE_FAIL = '[PROFILE] Create Profile Fail';
export const CREATE_PROFILE_SUCCESS = '[PROFILE] Create Profile Success';

export class CreateProfile implements Action {
  readonly type = CREATE_PROFILE;

  constructor(public payload: any) {
  }
}

export class CreateProfileFail implements Action {
  readonly type = CREATE_PROFILE_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateProfileSuccess implements Action {
  readonly type = CREATE_PROFILE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Update
export const UPDATE_PROFILE = '[PROFILE] Update Profile';
export const UPDATE_PROFILE_FAIL = '[PROFILE] Update Profile Fail';
export const UPDATE_PROFILE_SUCCESS = '[PROFILE] Update Profile Success';

export class UpdateProfile implements Action {
  readonly type = UPDATE_PROFILE;

  constructor(public payload: any) {
  }
}

export class UpdateProfileFail implements Action {
  readonly type = UPDATE_PROFILE_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateProfileSuccess implements Action {
  readonly type = UPDATE_PROFILE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Update Status
export const UPDATE_PROFILE_STATUS = '[PROFILE] Update status Profile';
export const UPDATE_PROFILE_STATUS_FAIL = '[PROFILE] Update status Profile Fail';
export const UPDATE_PROFILE_STATUS_SUCCESS = '[PROFILE] Update status Profile Success';

export class UpdateProfileStatus implements Action {
  readonly type = UPDATE_PROFILE_STATUS;

  constructor(public payload: any) {
  }
}

export class UpdateProfileStatusFail implements Action {
  readonly type = UPDATE_PROFILE_STATUS_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateProfileStatusSuccess implements Action {
  readonly type = UPDATE_PROFILE_STATUS_SUCCESS;

  constructor(public payload: any) {
  }
}


// =========================== Remove
export const REMOVE_PROFILE = '[PROFILE] Remove Profile';
export const REMOVE_PROFILE_FAIL = '[PROFILE] Remove Profile Fail';
export const REMOVE_PROFILE_SUCCESS = '[PROFILE] Remove Profile Success';

export class RemoveProfile implements Action {
  readonly type = REMOVE_PROFILE;

  constructor(public payload: any) {
  }
}

export class RemoveProfileFail implements Action {
  readonly type = REMOVE_PROFILE_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveProfileSuccess implements Action {
  readonly type = REMOVE_PROFILE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionProfile = LoadProfile | LoadProfileFail | LoadProfileSuccess
  | LoadDetailProfile | LoadDetailProfileFail | LoadDetailProfileSuccess
  | CreateProfile | CreateProfileFail | CreateProfileSuccess
  | UpdateProfile | UpdateProfileFail | UpdateProfileSuccess
  | UpdateProfileStatus | UpdateProfileStatusFail | UpdateProfileStatusSuccess
  | RemoveProfile | RemoveProfileFail | RemoveProfileSuccess;
