// =========================== load
import {Action} from '@ngrx/store';

export const LOAD_VEHICLE = '[VEHICLE] Load Vehicle';
export const LOAD_VEHICLE_FAIL = '[VEHICLE] Load Vehicle Fail';
export const LOAD_VEHICLE_SUCCESS = '[VEHICLE] Load Vehicle Success';

export class LoadVehicle implements Action {
  readonly type = LOAD_VEHICLE;

  constructor(public payload: any) {
  }
}

export class LoadVehicleFail implements Action {
  readonly type = LOAD_VEHICLE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadVehicleSuccess implements Action {
  readonly type = LOAD_VEHICLE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionVehicle = LoadVehicle | LoadVehicleFail | LoadVehicleSuccess;
