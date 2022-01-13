import {Action} from '@ngrx/store';

// =========================== load
export const LOAD_DEPARTMENT_BY_WORK_UNIT = '[DEPARTMENT] Load Department ByWorkUnit';
export const LOAD_DEPARTMENT_BY_WORK_UNIT_FAIL = '[DEPARTMENT] Load Department ByWorkUnit Fail';
export const LOAD_DEPARTMENT_BY_WORK_UNIT_SUCCESS = '[DEPARTMENT] Load Department ByWorkUnit Success';

export class LoadDepartmentByWorkUnit implements Action {
  readonly type = LOAD_DEPARTMENT_BY_WORK_UNIT;

  constructor(public payload: any) {
  }
}

export class LoadDepartmentByWorkUnitFail implements Action {
  readonly type = LOAD_DEPARTMENT_BY_WORK_UNIT_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadDepartmentByWorkUnitSuccess implements Action {
  readonly type = LOAD_DEPARTMENT_BY_WORK_UNIT_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionDepartment = LoadDepartmentByWorkUnit | LoadDepartmentByWorkUnitFail | LoadDepartmentByWorkUnitSuccess;
