import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as employeeActions from '../actions/employee.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromService from '../../services';

@Injectable()
export class EmployeeEffect {
  constructor(private actions$: Actions,
              private employeeService: fromService.EmployeeService) {
  }

  getPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(employeeActions.LOAD_EMPLOYEE),
      map((action: employeeActions.LoadEmployee) => action.payload),
      switchMap((payload) => {
        return this.employeeService
          .getPage(payload)
          .pipe(
            map(response => new employeeActions.LoadEmployeeSuccess(response?.body)),
            catchError(error => of(new employeeActions.LoadEmployeeFail(error)))
          );
      })
    )
  );


  getDetail$ = createEffect(
    () => this.actions$.pipe(
      ofType(employeeActions.LOAD_DETAIL_EMPLOYEE),
      map((action: employeeActions.LoadDetailEmployee) => action.payload),
      switchMap((payload) => {
        return this.employeeService
          .getDetail(payload)
          .pipe(
            map(response => new employeeActions.LoadDetailEmployeeSuccess(response?.body)),
            catchError(error => of(new employeeActions.LoadDetailEmployeeFail(error)))
          );
      })
    )
  );

  create$ = createEffect(
    () => this.actions$.pipe(
      ofType(employeeActions.CREATE_EMPLOYEE),
      map((action: employeeActions.CreateEmployee) => action.payload),
      switchMap((payload) => {
        return this.employeeService
          .create(payload)
          .pipe(
            map(response => new employeeActions.CreateEmployeeSuccess(response?.body)),
            catchError(error => of(new employeeActions.CreateEmployeeFail(error)))
          );
      })
    )
  );

  update$ = createEffect(
    () => this.actions$.pipe(
      ofType(employeeActions.UPDATE_EMPLOYEE),
      map((action: employeeActions.UpdateEmployee) => action.payload),
      switchMap((payload) => {
        return this.employeeService
          .edit(payload)
          .pipe(
            map(response => new employeeActions.UpdateEmployeeSuccess(response?.body)),
            catchError(error => of(new employeeActions.UpdateEmployeeFail(error)))
          );
      })
    )
  );

  delete$ = createEffect(
    () => this.actions$.pipe(
      ofType(employeeActions.REMOVE_EMPLOYEE),
      map((action: employeeActions.RemoveEmployee) => action.payload),
      switchMap((payload) => {
        return this.employeeService
          .remove(payload)
          .pipe(
            map(response => new employeeActions.RemoveEmployeeSuccess(response?.body)),
            catchError(error => of(new employeeActions.RemoveEmployeeFail(error)))
          );
      })
    )
  );
}