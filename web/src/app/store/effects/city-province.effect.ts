import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as cityProvinceActions from '../actions/city-province.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class CityProvinceEffect {
  constructor(private actions$: Actions,
              private cityProvinceService: fromService.CityProvinceService) {
  }

  getAll$ = createEffect(
    () => this.actions$.pipe(
      ofType(cityProvinceActions.LOAD_CITY_PROVINCE),
      // map((action: cityProvinceActions.LoadCityProvince) => action.payload),
      switchMap(() => {
        return this.cityProvinceService
          .getAll()
          .pipe(
            map(response => new cityProvinceActions.LoadCityProvinceSuccess(response?.body)),
            catchError(({error}) => of(new cityProvinceActions.LoadCityProvinceFail(error)))
          );
      })
    )
  );
}
