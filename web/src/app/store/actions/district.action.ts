import {Action} from '@ngrx/store';

// =========================== load
export const LOAD_DISTRICT_BY_CITY_PROVINCE = '[DISTRICT] Load District By CityProvince';
export const LOAD_DISTRICT_BY_CITY_PROVINCE_FAIL = '[DISTRICT] Load District By CityProvince Fail';
export const LOAD_DISTRICT_BY_CITY_PROVINCE_SUCCESS = '[DISTRICT] Load District By CityProvince Success';

export class LoadDistrictByCityProvince implements Action {
  readonly type = LOAD_DISTRICT_BY_CITY_PROVINCE;

  constructor(public payload: any) {
  }
}

export class LoadDistrictByCityProvinceFail implements Action {
  readonly type = LOAD_DISTRICT_BY_CITY_PROVINCE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadDistrictByCityProvinceSuccess implements Action {
  readonly type = LOAD_DISTRICT_BY_CITY_PROVINCE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionDistrict = LoadDistrictByCityProvince | LoadDistrictByCityProvinceFail | LoadDistrictByCityProvinceSuccess;
