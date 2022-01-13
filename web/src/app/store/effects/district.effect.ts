import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as districtActions from '../actions/district.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class DistrictEffect {
  constructor(private actions$: Actions,
              private districtService: fromService.DistrictService) {
  }

  getByCityProvince$ = createEffect(
    () => this.actions$.pipe(
      ofType(districtActions.LOAD_DISTRICT_BY_CITY_PROVINCE),
      map((action: districtActions.LoadDistrictByCityProvince) => action.payload),
      switchMap((payload) => {
        return this.districtService
          .getByCityProvince(payload)
          .pipe(
            map(response => new districtActions.LoadDistrictByCityProvinceSuccess(response?.body)),
            catchError(error => of(new districtActions.LoadDistrictByCityProvinceFail(error)))
          );
      })
    )
  );
}
