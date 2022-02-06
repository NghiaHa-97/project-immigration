import {Action} from '@ngrx/store';


// =========================== load
export const LOAD_PROJECT_MISSION = '[PROJECT_MISSION] Load ProjectMission';
export const LOAD_PROJECT_MISSION_FAIL = '[PROJECT_MISSION] Load ProjectMission Fail';
export const LOAD_PROJECT_MISSION_SUCCESS = '[PROJECT_MISSION] Load ProjectMission Success';

export class LoadProjectMission implements Action {
  readonly type = LOAD_PROJECT_MISSION;

  constructor(public payload: any) {
  }
}

export class LoadProjectMissionFail implements Action {
  readonly type = LOAD_PROJECT_MISSION_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadProjectMissionSuccess implements Action {
  readonly type = LOAD_PROJECT_MISSION_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== load DETAIL
export const LOAD_DETAIL_PROJECT_MISSION = '[PROJECT_MISSION] Load Detail ProjectMission';
export const LOAD_DETAIL_PROJECT_MISSION_FAIL = '[PROJECT_MISSION] Load Detail ProjectMission Fail';
export const LOAD_DETAIL_PROJECT_MISSION_SUCCESS = '[PROJECT_MISSION] Load Detail ProjectMission Success';

export class LoadDetailProjectMission implements Action {
  readonly type = LOAD_DETAIL_PROJECT_MISSION;

  constructor(public payload: any) {
  }
}

export class LoadDetailProjectMissionFail implements Action {
  readonly type = LOAD_DETAIL_PROJECT_MISSION_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadDetailProjectMissionSuccess implements Action {
  readonly type = LOAD_DETAIL_PROJECT_MISSION_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Create
export const CREATE_PROJECT_MISSION = '[PROJECT_MISSION] Create ProjectMission';
export const CREATE_PROJECT_MISSION_FAIL = '[PROJECT_MISSION] Create ProjectMission Fail';
export const CREATE_PROJECT_MISSION_SUCCESS = '[PROJECT_MISSION] Create ProjectMission Success';

export class CreateProjectMission implements Action {
  readonly type = CREATE_PROJECT_MISSION;

  constructor(public payload: any) {
  }
}

export class CreateProjectMissionFail implements Action {
  readonly type = CREATE_PROJECT_MISSION_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateProjectMissionSuccess implements Action {
  readonly type = CREATE_PROJECT_MISSION_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Update
export const UPDATE_PROJECT_MISSION = '[PROJECT_MISSION] Update ProjectMission';
export const UPDATE_PROJECT_MISSION_FAIL = '[PROJECT_MISSION] Update ProjectMission Fail';
export const UPDATE_PROJECT_MISSION_SUCCESS = '[PROJECT_MISSION] Update ProjectMission Success';

export class UpdateProjectMission implements Action {
  readonly type = UPDATE_PROJECT_MISSION;

  constructor(public payload: any) {
  }
}

export class UpdateProjectMissionFail implements Action {
  readonly type = UPDATE_PROJECT_MISSION_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateProjectMissionSuccess implements Action {
  readonly type = UPDATE_PROJECT_MISSION_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Remove
export const REMOVE_PROJECT_MISSION = '[PROJECT_MISSION] Remove ProjectMission';
export const REMOVE_PROJECT_MISSION_FAIL = '[PROJECT_MISSION] Remove ProjectMission Fail';
export const REMOVE_PROJECT_MISSION_SUCCESS = '[PROJECT_MISSION] Remove ProjectMission Success';

export class RemoveProjectMission implements Action {
  readonly type = REMOVE_PROJECT_MISSION;

  constructor(public payload: any) {
  }
}

export class RemoveProjectMissionFail implements Action {
  readonly type = REMOVE_PROJECT_MISSION_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveProjectMissionSuccess implements Action {
  readonly type = REMOVE_PROJECT_MISSION_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionProjectMission = LoadProjectMission | LoadProjectMissionFail | LoadProjectMissionSuccess
  | LoadDetailProjectMission | LoadDetailProjectMissionFail | LoadDetailProjectMissionSuccess
  | CreateProjectMission | CreateProjectMissionFail | CreateProjectMissionSuccess
  | UpdateProjectMission | UpdateProjectMissionFail | UpdateProjectMissionSuccess
  | RemoveProjectMission | RemoveProjectMissionFail | RemoveProjectMissionSuccess;
