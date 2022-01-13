import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as departmentActions from '../actions/department.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class DepartmentEffect {
  constructor(private actions$: Actions,
              private departmentService: fromService.DepartmentService) {
  }

  getByWorkUnit$ = createEffect(
    () => this.actions$.pipe(
      ofType(departmentActions.LOAD_DEPARTMENT_BY_WORK_UNIT),
      map((action: departmentActions.LoadDepartmentByWorkUnit) => action.payload),
      switchMap((payload) => {
        return this.departmentService
          .getByWorkUnit(payload)
          .pipe(
            map(response => new departmentActions.LoadDepartmentByWorkUnitSuccess(response?.body)),
            catchError(error => of(new departmentActions.LoadDepartmentByWorkUnitFail(error)))
          );
      })
    )
  );
}
