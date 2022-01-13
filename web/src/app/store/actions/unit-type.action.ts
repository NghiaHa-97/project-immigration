import {Action} from '@ngrx/store';

// =========================== load
export const LOAD_UNIT_TYPE = '[UNIT_TYPE] Load UnitType';
export const LOAD_UNIT_TYPE_FAIL = '[UNIT_TYPE] Load UnitType Fail';
export const LOAD_UNIT_TYPE_SUCCESS = '[UNIT_TYPE] Load UnitType Success';

export class LoadUnitType implements Action {
  readonly type = LOAD_UNIT_TYPE;

  constructor(public payload: any) {
  }
}

export class LoadUnitTypeFail implements Action {
  readonly type = LOAD_UNIT_TYPE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadUnitTypeSuccess implements Action {
  readonly type = LOAD_UNIT_TYPE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionUnitType = LoadUnitType | LoadUnitTypeFail | LoadUnitTypeSuccess;
