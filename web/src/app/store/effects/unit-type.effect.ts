import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as unitTypeActions from '../actions/unit-type.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class UnitTypeEffect {
  constructor(private actions$: Actions,
              private unitTypeService: fromService.UnitTypeService) {
  }

  getAll$ = createEffect(
    () => this.actions$.pipe(
      ofType(unitTypeActions.LOAD_UNIT_TYPE),
      // map((action: unitTypeActions.LoadUnitType) => action.payload),
      switchMap(() => {
        return this.unitTypeService
          .getAll()
          .pipe(
            map(response => new unitTypeActions.LoadUnitTypeSuccess(response?.body)),
            catchError(error => of(new unitTypeActions.LoadUnitTypeFail(error)))
          );
      })
    )
  );
}
