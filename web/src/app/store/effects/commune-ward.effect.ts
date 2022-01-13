import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as communeWardActions from '../actions/commune-ward.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class CommuneWardEffect {
  constructor(private actions$: Actions,
              private communeWardService: fromService.CommuneWardService) {
  }

  getByDistrict$ = createEffect(
    () => this.actions$.pipe(
      ofType(communeWardActions.LOAD_COMMUNE_WARD_BY_DISTRICT),
      map((action: communeWardActions.LoadCommuneWardByDistrict) => action.payload),
      switchMap((payload) => {
        return this.communeWardService
          .getByDistrict(payload)
          .pipe(
            map(response => new communeWardActions.LoadCommuneWardByDistrictSuccess(response?.body)),
            catchError(error => of(new communeWardActions.LoadCommuneWardByDistrictFail(error)))
          );
      })
    )
  );
}
