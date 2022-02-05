// =========================== load
import {Action} from '@ngrx/store';

export const LOAD_STATUS_PROFILE = '[STATUS_PROFILE] Load StatusProfile';
export const LOAD_STATUS_PROFILE_FAIL = '[STATUS_PROFILE] Load StatusProfile Fail';
export const LOAD_STATUS_PROFILE_SUCCESS = '[STATUS_PROFILE] Load StatusProfile Success';

export class LoadStatusProfile implements Action {
  readonly type = LOAD_STATUS_PROFILE;

  constructor(public payload: any) {
  }
}

export class LoadStatusProfileFail implements Action {
  readonly type = LOAD_STATUS_PROFILE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadStatusProfileSuccess implements Action {
  readonly type = LOAD_STATUS_PROFILE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionStatusProfile = LoadStatusProfile | LoadStatusProfileFail | LoadStatusProfileSuccess;
