import {Action} from '@ngrx/store';

// =========================== load Page
export const LOAD_ASSIGN_TASKS = '[ASSIGN_TASKS] Load AssignTasks';
export const LOAD_ASSIGN_TASKS_FAIL = '[ASSIGN_TASKS] Load AssignTasks Fail';
export const LOAD_ASSIGN_TASKS_SUCCESS = '[ASSIGN_TASKS] Load AssignTasks Success';

export class LoadAssignTasks implements Action {
  readonly type = LOAD_ASSIGN_TASKS;

  constructor(public payload: any) {
  }
}

export class LoadAssignTasksFail implements Action {
  readonly type = LOAD_ASSIGN_TASKS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadAssignTasksSuccess implements Action {
  readonly type = LOAD_ASSIGN_TASKS_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== load DETAIL
export const LOAD_DETAIL_ASSIGN_TASKS = '[ASSIGN_TASKS] Load Detail AssignTasks';
export const LOAD_DETAIL_ASSIGN_TASKS_FAIL = '[ASSIGN_TASKS] Load Detail AssignTasks Fail';
export const LOAD_DETAIL_ASSIGN_TASKS_SUCCESS = '[ASSIGN_TASKS] Load Detail AssignTasks Success';

export class LoadDetailAssignTasks implements Action {
  readonly type = LOAD_DETAIL_ASSIGN_TASKS;

  constructor(public payload: any) {
  }
}

export class LoadDetailAssignTasksFail implements Action {
  readonly type = LOAD_DETAIL_ASSIGN_TASKS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadDetailAssignTasksSuccess implements Action {
  readonly type = LOAD_DETAIL_ASSIGN_TASKS_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Create
export const CREATE_ASSIGN_TASKS = '[ASSIGN_TASKS] Create AssignTasks';
export const CREATE_ASSIGN_TASKS_FAIL = '[ASSIGN_TASKS] Create AssignTasks Fail';
export const CREATE_ASSIGN_TASKS_SUCCESS = '[ASSIGN_TASKS] Create AssignTasks Success';

export class CreateAssignTasks implements Action {
  readonly type = CREATE_ASSIGN_TASKS;

  constructor(public payload: any) {
  }
}

export class CreateAssignTasksFail implements Action {
  readonly type = CREATE_ASSIGN_TASKS_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateAssignTasksSuccess implements Action {
  readonly type = CREATE_ASSIGN_TASKS_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Update
export const UPDATE_ASSIGN_TASKS = '[ASSIGN_TASKS] Update AssignTasks';
export const UPDATE_ASSIGN_TASKS_FAIL = '[ASSIGN_TASKS] Update AssignTasks Fail';
export const UPDATE_ASSIGN_TASKS_SUCCESS = '[ASSIGN_TASKS] Update AssignTasks Success';

export class UpdateAssignTasks implements Action {
  readonly type = UPDATE_ASSIGN_TASKS;

  constructor(public payload: any) {
  }
}

export class UpdateAssignTasksFail implements Action {
  readonly type = UPDATE_ASSIGN_TASKS_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateAssignTasksSuccess implements Action {
  readonly type = UPDATE_ASSIGN_TASKS_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Remove
export const REMOVE_ASSIGN_TASKS = '[ASSIGN_TASKS] Remove AssignTasks';
export const REMOVE_ASSIGN_TASKS_FAIL = '[ASSIGN_TASKS] Remove AssignTasks Fail';
export const REMOVE_ASSIGN_TASKS_SUCCESS = '[ASSIGN_TASKS] Remove AssignTasks Success';

export class RemoveAssignTasks implements Action {
  readonly type = REMOVE_ASSIGN_TASKS;

  constructor(public payload: any) {
  }
}

export class RemoveAssignTasksFail implements Action {
  readonly type = REMOVE_ASSIGN_TASKS_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveAssignTasksSuccess implements Action {
  readonly type = REMOVE_ASSIGN_TASKS_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionAssignTasks = LoadAssignTasks | LoadAssignTasksFail | LoadAssignTasksSuccess
  | LoadDetailAssignTasks | LoadDetailAssignTasksFail | LoadDetailAssignTasksSuccess
  | CreateAssignTasks | CreateAssignTasksFail | CreateAssignTasksSuccess
  | UpdateAssignTasks | UpdateAssignTasksFail | UpdateAssignTasksSuccess
  | RemoveAssignTasks | RemoveAssignTasksFail | RemoveAssignTasksSuccess;
