import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as workUnitActions from '../actions/work-unit.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class WorkUnitEffect {
  constructor(private actions$: Actions,
              private workUnitService: fromService.WorkUnitService) {
  }

  getByUnitType$ = createEffect(
    () => this.actions$.pipe(
      ofType(workUnitActions.LOAD_WORK_UNIT_BY_UNIT_TYPE),
      map((action: workUnitActions.LoadWorkUnitByUnitType) => action.payload),
      switchMap((payload) => {
        return this.workUnitService
          .getByUnitType(payload)
          .pipe(
            map(response => new workUnitActions.LoadWorkUnitByUnitTypeSuccess(response?.body)),
            catchError(error => of(new workUnitActions.LoadWorkUnitByUnitTypeFail(error)))
          );
      })
    )
  );
}
