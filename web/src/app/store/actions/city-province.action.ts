import {Action} from '@ngrx/store';

// =========================== load
export const LOAD_CITY_PROVINCE = '[CITY_PROVINCE] Load CityProvince';
export const LOAD_CITY_PROVINCE_FAIL = '[CITY_PROVINCE] Load CityProvince Fail';
export const LOAD_CITY_PROVINCE_SUCCESS = '[CITY_PROVINCE] Load CityProvince Success';

export class LoadCityProvince implements Action {
  readonly type = LOAD_CITY_PROVINCE;

  constructor(public payload: any) {
  }
}

export class LoadCityProvinceFail implements Action {
  readonly type = LOAD_CITY_PROVINCE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadCityProvinceSuccess implements Action {
  readonly type = LOAD_CITY_PROVINCE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionCityProvince = LoadCityProvince | LoadCityProvinceFail | LoadCityProvinceSuccess;

