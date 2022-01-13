import {Action} from '@ngrx/store';

// =========================== load
export const LOAD_COMMUNE_WARD_BY_DISTRICT = '[COMMUNE_WARD] Load CommuneWard By District';
export const LOAD_COMMUNE_WARD_BY_DISTRICT_FAIL = '[COMMUNE_WARD] Load CommuneWard By District Fail';
export const LOAD_COMMUNE_WARD_BY_DISTRICT_SUCCESS = '[COMMUNE_WARD] Load CommuneWard By District Success';

export class LoadCommuneWardByDistrict implements Action {
  readonly type = LOAD_COMMUNE_WARD_BY_DISTRICT;

  constructor(public payload: any) {
  }
}

export class LoadCommuneWardByDistrictFail implements Action {
  readonly type = LOAD_COMMUNE_WARD_BY_DISTRICT_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadCommuneWardByDistrictSuccess implements Action {
  readonly type = LOAD_COMMUNE_WARD_BY_DISTRICT_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionCommuneWard = LoadCommuneWardByDistrict | LoadCommuneWardByDistrictFail | LoadCommuneWardByDistrictSuccess;
