import {Action} from '@ngrx/store';


// =========================== load
export const LOAD_EMPLOYEE = '[EMPLOYEE] Load Employee';
export const LOAD_EMPLOYEE_FAIL = '[EMPLOYEE] Load Employee Fail';
export const LOAD_EMPLOYEE_SUCCESS = '[EMPLOYEE] Load Employee Success';

export class LoadEmployee implements Action {
  readonly type = LOAD_EMPLOYEE;

  constructor(public payload: any) {
  }
}

export class LoadEmployeeFail implements Action {
  readonly type = LOAD_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadEmployeeSuccess implements Action {
  readonly type = LOAD_EMPLOYEE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== load DETAIL
export const LOAD_DETAIL_EMPLOYEE = '[EMPLOYEE] Load Detail Employee';
export const LOAD_DETAIL_EMPLOYEE_FAIL = '[EMPLOYEE] Load Detail Employee Fail';
export const LOAD_DETAIL_EMPLOYEE_SUCCESS = '[EMPLOYEE] Load Detail Employee Success';

export class LoadDetailEmployee implements Action {
  readonly type = LOAD_DETAIL_EMPLOYEE;

  constructor(public payload: any) {
  }
}

export class LoadDetailEmployeeFail implements Action {
  readonly type = LOAD_DETAIL_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadDetailEmployeeSuccess implements Action {
  readonly type = LOAD_DETAIL_EMPLOYEE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Create
export const CREATE_EMPLOYEE = '[EMPLOYEE] Create Employee';
export const CREATE_EMPLOYEE_FAIL = '[EMPLOYEE] Create Employee Fail';
export const CREATE_EMPLOYEE_SUCCESS = '[EMPLOYEE] Create Employee Success';

export class CreateEmployee implements Action {
  readonly type = CREATE_EMPLOYEE;

  constructor(public payload: any) {
  }
}

export class CreateEmployeeFail implements Action {
  readonly type = CREATE_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateEmployeeSuccess implements Action {
  readonly type = CREATE_EMPLOYEE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Update
export const UPDATE_EMPLOYEE = '[EMPLOYEE] Update Employee';
export const UPDATE_EMPLOYEE_FAIL = '[EMPLOYEE] Update Employee Fail';
export const UPDATE_EMPLOYEE_SUCCESS = '[EMPLOYEE] Update Employee Success';

export class UpdateEmployee implements Action {
  readonly type = UPDATE_EMPLOYEE;

  constructor(public payload: any) {
  }
}

export class UpdateEmployeeFail implements Action {
  readonly type = UPDATE_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}

export class UpdateEmployeeSuccess implements Action {
  readonly type = UPDATE_EMPLOYEE_SUCCESS;

  constructor(public payload: any) {
  }
}

// =========================== Remove
export const REMOVE_EMPLOYEE = '[EMPLOYEE] Remove Employee';
export const REMOVE_EMPLOYEE_FAIL = '[EMPLOYEE] Remove Employee Fail';
export const REMOVE_EMPLOYEE_SUCCESS = '[EMPLOYEE] Remove Employee Success';

export class RemoveEmployee implements Action {
  readonly type = REMOVE_EMPLOYEE;

  constructor(public payload: any) {
  }
}

export class RemoveEmployeeFail implements Action {
  readonly type = REMOVE_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}

export class RemoveEmployeeSuccess implements Action {
  readonly type = REMOVE_EMPLOYEE_SUCCESS;

  constructor(public payload: any) {
  }
}

export type ActionEmployee = LoadEmployee | LoadEmployeeFail | LoadEmployeeSuccess
  | LoadDetailEmployee | LoadDetailEmployeeFail | LoadDetailEmployeeSuccess
  | CreateEmployee | CreateEmployeeFail | CreateEmployeeSuccess
  | UpdateEmployee | UpdateEmployeeFail | UpdateEmployeeSuccess
  | RemoveEmployee | RemoveEmployeeFail | RemoveEmployeeSuccess;
