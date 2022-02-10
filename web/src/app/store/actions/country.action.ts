import {Action} from '@ngrx/store';

// =========================== load
export const LOAD_COUNTRY = '[COUNTRY] Load Country';
export const LOAD_COUNTRY_FAIL = '[COUNTRY] Load Country Fail';
export const LOAD_COUNTRY_SUCCESS = '[COUNTRY] Load Country Success';

export class LoadCountry implements Action {
  readonly type = LOAD_COUNTRY;

  constructor(public payload: any) {
  }
}

export class LoadCountryFail implements Action {
  readonly type = LOAD_COUNTRY_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadCountrySuccess implements Action {
  readonly type = LOAD_COUNTRY_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionCountry = LoadCountry | LoadCountryFail | LoadCountrySuccess;

