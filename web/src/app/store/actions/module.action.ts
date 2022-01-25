// =========================== load
import {Action} from '@ngrx/store';

export const LOAD_MODULE = '[MODULE] Load Module';
export const LOAD_MODULE_FAIL = '[MODULE] Load Module Fail';
export const LOAD_MODULE_SUCCESS = '[MODULE] Load Module Success';

export class LoadModule implements Action {
  readonly type = LOAD_MODULE;

  constructor(public payload: any) {
  }
}

export class LoadModuleFail implements Action {
  readonly type = LOAD_MODULE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadModuleSuccess implements Action {
  readonly type = LOAD_MODULE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionModule = LoadModule | LoadModuleFail | LoadModuleSuccess;
