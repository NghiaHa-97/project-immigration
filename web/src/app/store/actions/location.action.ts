import {Action} from '@ngrx/store';

// =========================== load Page
export const LOAD_PAGE_LOCATION = '[LOCATION] Load Page Location';
export const LOAD_PAGE_LOCATION_FAIL = '[LOCATION] Load Page Location Fail';
export const LOAD_PAGE_LOCATION_SUCCESS = '[LOCATION] Load Page Location Success';

export class LoadPageLocation implements Action {
  readonly type = LOAD_PAGE_LOCATION;

  constructor(public payload: any) {
  }
}

export class LoadPageLocationFail implements Action {
  readonly type = LOAD_PAGE_LOCATION_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadPageLocationSuccess implements Action {
  readonly type = LOAD_PAGE_LOCATION_SUCCESS;

  constructor(public payload: any) {
  }
}


// =========================== load view
export const LOAD_VIEW_LOCATION = '[LOCATION] Load View Location';
export const LOAD_VIEW_LOCATION_FAIL = '[LOCATION] Load View Location Fail';
export const LOAD_VIEW_LOCATION_SUCCESS = '[LOCATION] Load View Location Success';

export class LoadViewLocation implements Action {
  readonly type = LOAD_VIEW_LOCATION;

  constructor(public payload: any) {
  }
}

export class LoadViewLocationFail implements Action {
  readonly type = LOAD_VIEW_LOCATION_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadViewLocationSuccess implements Action {
  readonly type = LOAD_VIEW_LOCATION_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== load detail
export const LOAD_LOCATION_DETAIL = '[LOCATION] Load Location detail';
export const LOAD_LOCATION_DETAIL_FAIL = '[LOCATION] Load Location detail Fail';
export const LOAD_LOCATION_DETAIL_SUCCESS = '[LOCATION] Load Location detail Success';

export class LoadLocationDetail implements Action {
  readonly type = LOAD_LOCATION_DETAIL;

  constructor(public payload: any) {
  }
}

export class LoadLocationDetailFail implements Action {
  readonly type = LOAD_LOCATION_DETAIL_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadLocationDetailSuccess implements Action {
  readonly type = LOAD_LOCATION_DETAIL_SUCCESS;

  constructor(public payload: any) {
  }
}


// =========================== Save
export const SAVE_LOCATION = '[LOCATION] Save Location';
export const SAVE_LOCATION_FAIL = '[LOCATION] Save Location Fail';
export const SAVE_LOCATION_SUCCESS = '[LOCATION] Save Location Success';

export class SaveLocation implements Action {
  readonly type = SAVE_LOCATION;

  constructor(public payload: any) {
  }
}

export class SaveLocationFail implements Action {
  readonly type = SAVE_LOCATION_FAIL;

  constructor(public payload: any) {
  }
}

export class SaveLocationSuccess implements Action {
  readonly type = SAVE_LOCATION_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Remove
export const REMOVE_LOCATION = '[LOCATION] Remove Location';
export const REMOVE_LOCATION_FAIL = '[LOCATION] Remove Location Fail';
export const REMOVE_LOCATION_SUCCESS = '[LOCATION] Remove Location Success';

export class RemoveLocation implements Action {
  readonly type = REMOVE_LOCATION;

  constructor(public payload: any) {
  }
}

export class RemoveLocationFail implements Action {
  readonly type = REMOVE_LOCATION_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveLocationSuccess implements Action {
  readonly type = REMOVE_LOCATION_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionLocation = LoadPageLocation | LoadPageLocationFail | LoadPageLocationSuccess
  | LoadViewLocation | LoadViewLocationFail | LoadViewLocationSuccess
  | LoadLocationDetail | LoadLocationDetailFail | LoadLocationDetailSuccess
  | SaveLocation | SaveLocationFail | SaveLocationSuccess
  | RemoveLocation | RemoveLocationFail | RemoveLocationSuccess;
