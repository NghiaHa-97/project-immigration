import {Action} from '@ngrx/store';

// =========================== load add by profile
export const LOAD_COMMENT_BY_PROFILE = '[COMMENT] Load Comment by profile';
export const LOAD_COMMENT_BY_PROFILE_FAIL = '[COMMENT] Load Comment by profile Fail';
export const LOAD_COMMENT_BY_PROFILE_SUCCESS = '[COMMENT] Load Comment by profile Success';

export class LoadCommentByProfIle implements Action {
  readonly type = LOAD_COMMENT_BY_PROFILE;

  constructor(public payload: any) {
  }
}

export class LoadCommentByProfIleFail implements Action {
  readonly type = LOAD_COMMENT_BY_PROFILE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadCommentByProfIleSuccess implements Action {
  readonly type = LOAD_COMMENT_BY_PROFILE_SUCCESS;

  constructor(public payload: any) {
  }
}


// =========================== load comment by profile and employee
export const LOAD_COMMENT_BY_PROFILE_EMPLOYEE = '[COMMENT] Load Comment by profile and employee';
export const LOAD_COMMENT_BY_PROFILE_EMPLOYEE_FAIL = '[COMMENT] Load Comment by profile and employee Fail';
export const LOAD_COMMENT_BY_PROFILE_EMPLOYEE_SUCCESS = '[COMMENT] Load Comment by profile and employee Success';

export class LoadCommentByProfileEmployee implements Action {
  readonly type = LOAD_COMMENT_BY_PROFILE_EMPLOYEE;

  constructor(public payload: any) {
  }
}

export class LoadCommentByProfileEmployeeFail implements Action {
  readonly type = LOAD_COMMENT_BY_PROFILE_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadCommentByProfileEmployeeSuccess implements Action {
  readonly type = LOAD_COMMENT_BY_PROFILE_EMPLOYEE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== load DETAIL
export const LOAD_DETAIL_COMMENT = '[COMMENT] Load Detail Comment';
export const LOAD_DETAIL_COMMENT_FAIL = '[COMMENT] Load Detail Comment Fail';
export const LOAD_DETAIL_COMMENT_SUCCESS = '[COMMENT] Load Detail Comment Success';

export class LoadDetailComment implements Action {
  readonly type = LOAD_DETAIL_COMMENT;

  constructor(public payload: any) {
  }
}

export class LoadDetailCommentFail implements Action {
  readonly type = LOAD_DETAIL_COMMENT_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadDetailCommentSuccess implements Action {
  readonly type = LOAD_DETAIL_COMMENT_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Create
export const CREATE_COMMENT = '[COMMENT] Create Comment';
export const CREATE_COMMENT_FAIL = '[COMMENT] Create Comment Fail';
export const CREATE_COMMENT_SUCCESS = '[COMMENT] Create Comment Success';

export class CreateComment implements Action {
  readonly type = CREATE_COMMENT;

  constructor(public payload: any) {
  }
}

export class CreateCommentFail implements Action {
  readonly type = CREATE_COMMENT_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateCommentSuccess implements Action {
  readonly type = CREATE_COMMENT_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionComment =
  LoadCommentByProfIle | LoadCommentByProfIleFail | LoadCommentByProfIleSuccess
  | LoadCommentByProfileEmployee | LoadCommentByProfileEmployeeFail | LoadCommentByProfileEmployeeSuccess
  | LoadDetailComment | LoadDetailCommentFail | LoadDetailCommentSuccess
  | CreateComment | CreateCommentFail | CreateCommentSuccess;
