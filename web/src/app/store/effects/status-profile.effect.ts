import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as statusProfile from '../actions/status-profile.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class StatusProfileEffect {
  constructor(private actions$: Actions,
              private statusProfileService: fromService.StatusProfileService) {
  }

  getAll$ = createEffect(
    () => this.actions$.pipe(
      ofType(statusProfile.LOAD_STATUS_PROFILE),
      // map((action: cityProvinceActions.LoadCityProvince) => action.payload),
      switchMap(() => {
        return this.statusProfileService
          .getAll()
          .pipe(
            map(response => new statusProfile.LoadStatusProfileSuccess(response?.body)),
            catchError(error => of(new statusProfile.LoadStatusProfileFail(error)))
          );
      })
    )
  );
}
