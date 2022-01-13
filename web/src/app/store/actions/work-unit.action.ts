import {Action} from '@ngrx/store';


// =========================== load _BY_UNIT_TYPE
export const LOAD_WORK_UNIT_BY_UNIT_TYPE = '[WORK_UNIT] Load WorkUnit ByUnitType';
export const LOAD_WORK_UNIT_BY_UNIT_TYPE_FAIL = '[WORK_UNIT] Load WorkUnit ByUnitType Fail';
export const LOAD_WORK_UNIT_BY_UNIT_TYPE_SUCCESS = '[WORK_UNIT] Load WorkUnit ByUnitType Success';

export class LoadWorkUnitByUnitType implements Action {
  readonly type = LOAD_WORK_UNIT_BY_UNIT_TYPE;

  constructor(public payload: any) {
  }
}

export class LoadWorkUnitByUnitTypeFail implements Action {
  readonly type = LOAD_WORK_UNIT_BY_UNIT_TYPE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadWorkUnitByUnitTypeSuccess implements Action {
  readonly type = LOAD_WORK_UNIT_BY_UNIT_TYPE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionWorkUnit = LoadWorkUnitByUnitType | LoadWorkUnitByUnitTypeFail | LoadWorkUnitByUnitTypeSuccess;

