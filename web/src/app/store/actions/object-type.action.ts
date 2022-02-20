import {Action} from '@ngrx/store';

// =========================== load all
export const LOAD_OBJECT_TYPE = '[OBJECT_TYPE] Load Object Type';
export const LOAD_OBJECT_TYPE_FAIL = '[OBJECT_TYPE] Load Object Type Fail';
export const LOAD_OBJECT_TYPE_SUCCESS = '[OBJECT_TYPE] Load Object Type Success';

export class LoadObjectType implements Action {
  readonly type = LOAD_OBJECT_TYPE;

  constructor(public payload: any) {
  }
}

export class LoadObjectTypeFail implements Action {
  readonly type = LOAD_OBJECT_TYPE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadObjectTypeSuccess implements Action {
  readonly type = LOAD_OBJECT_TYPE_SUCCESS;

  constructor(public payload: any) {
  }
}




// =========================== Save
export const SAVE_OBJECT_TYPE = '[OBJECT_TYPE] Save ObjectType';
export const SAVE_OBJECT_TYPE_FAIL = '[OBJECT_TYPE] Save ObjectType Fail';
export const SAVE_OBJECT_TYPE_SUCCESS = '[OBJECT_TYPE] Save ObjectType Success';

export class SaveObjectType implements Action {
  readonly type = SAVE_OBJECT_TYPE;

  constructor(public payload: any) {
  }
}

export class SaveObjectTypeFail implements Action {
  readonly type = SAVE_OBJECT_TYPE_FAIL;

  constructor(public payload: any) {
  }
}

export class SaveObjectTypeSuccess implements Action {
  readonly type = SAVE_OBJECT_TYPE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Remove
export const REMOVE_OBJECT_TYPE = '[OBJECT_TYPE] Remove ObjectType';
export const REMOVE_OBJECT_TYPE_FAIL = '[OBJECT_TYPE] Remove ObjectType Fail';
export const REMOVE_OBJECT_TYPE_SUCCESS = '[OBJECT_TYPE] Remove ObjectType Success';

export class RemoveObjectType implements Action {
  readonly type = REMOVE_OBJECT_TYPE;

  constructor(public payload: any) {
  }
}

export class RemoveObjectTypeFail implements Action {
  readonly type = REMOVE_OBJECT_TYPE_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveObjectTypeSuccess implements Action {
  readonly type = REMOVE_OBJECT_TYPE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionObjectType = LoadObjectType | LoadObjectTypeFail | LoadObjectTypeSuccess
  | SaveObjectType | SaveObjectTypeFail | SaveObjectTypeSuccess
  | RemoveObjectType | RemoveObjectTypeFail | RemoveObjectTypeSuccess;
