import {Action} from '@ngrx/store';


// =========================== load
export const LOAD_POSITION_BY_DEPARTMENT = '[POSITION] Load Position ByDepartment';
export const LOAD_POSITION_BY_DEPARTMENT_FAIL = '[POSITION] Load Position ByDepartment Fail';
export const LOAD_POSITION_BY_DEPARTMENT_SUCCESS = '[POSITION] Load Position ByDepartment Success';

export class LoadPositionByDepartment implements Action {
  readonly type = LOAD_POSITION_BY_DEPARTMENT;

  constructor(public payload: any) {
  }
}

export class LoadPositionByDepartmentFail implements Action {
  readonly type = LOAD_POSITION_BY_DEPARTMENT_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadPositionByDepartmentSuccess implements Action {
  readonly type = LOAD_POSITION_BY_DEPARTMENT_SUCCESS;

  constructor(public payload: any) {
  }
}



export type ActionPosition = LoadPositionByDepartment | LoadPositionByDepartmentFail | LoadPositionByDepartmentSuccess;
