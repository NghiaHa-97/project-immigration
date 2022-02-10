import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as countryActions from '../actions/country.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class CountryEffect {
  constructor(private actions$: Actions,
              private countryService: fromService.CountryService) {
  }

  getAll$ = createEffect(
    () => this.actions$.pipe(
      ofType(countryActions.LOAD_COUNTRY),
      switchMap(() => {
        return this.countryService
          .getAll()
          .pipe(
            map(response => new countryActions.LoadCountrySuccess(response?.body)),
            catchError(({error}) => of(new countryActions.LoadCountryFail(error)))
          );
      })
    )
  );
}
