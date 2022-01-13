import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as positionActions from '../actions/position.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class PositionEffect {
  constructor(private actions$: Actions,
              private positionService: fromService.PositionService) {
  }

  getByDepartment$ = createEffect(
    () => this.actions$.pipe(
      ofType(positionActions.LOAD_POSITION_BY_DEPARTMENT),
      map((action: positionActions.LoadPositionByDepartment) => action.payload),
      switchMap((payload) => {
        return this.positionService
          .getByDepartment(payload)
          .pipe(
            map(response => new positionActions.LoadPositionByDepartmentSuccess(response?.body)),
            catchError(error => of(new positionActions.LoadPositionByDepartmentFail(error)))
          );
      })
    )
  );
}
