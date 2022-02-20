import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as locationActions from '../actions/location.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromService from '../../services';
import {COLOR_SNACK_BAR, NotificationSnackBar} from '../../notification/notification-snack-bar';

@Injectable()
export class LocationEffect {
  constructor(private actions$: Actions,
              private locationService: fromService.LocationService,
              private notification: NotificationSnackBar) {
  }

  getPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(locationActions.LOAD_PAGE_LOCATION),
      map((action: locationActions.LoadPageLocation) => action.payload),
      switchMap((payload) => {
        return this.locationService
          .getPage(payload)
          .pipe(
            map(response => new locationActions.LoadPageLocationSuccess(response?.body)),
            catchError(error => of(new locationActions.LoadPageLocationFail(error)))
          );
      })
    )
  );


  getView$ = createEffect(
    () => this.actions$.pipe(
      ofType(locationActions.LOAD_VIEW_LOCATION),
      map((action: locationActions.LoadViewLocation) => action.payload),
      switchMap((payload) => {
        return this.locationService
          .view(payload)
          .pipe(
            map(response => new locationActions.LoadViewLocationSuccess(response?.body)),
            catchError(error => of(new locationActions.LoadViewLocationFail(error)))
          );
      })
    )
  );

  getDetail$ = createEffect(
    () => this.actions$.pipe(
      ofType(locationActions.LOAD_LOCATION_DETAIL),
      map((action: locationActions.LoadLocationDetail) => action.payload),
      switchMap((payload) => {
        return this.locationService
          .getDetail(payload)
          .pipe(
            map(response => new locationActions.LoadLocationDetailSuccess(response?.body)),
            catchError(error => of(new locationActions.LoadLocationDetailFail(error)))
          );
      })
    )
  );

  save$ = createEffect(
    () => this.actions$.pipe(
      ofType(locationActions.SAVE_LOCATION),
      map((action: locationActions.SaveLocation) => action.payload),
      switchMap((payload) => {
        return this.locationService
          .save(payload)
          .pipe(
            map(response => {
              const {message} = response?.body;
              this.notification.openSnackBar(message, COLOR_SNACK_BAR.GREEN);
              return new locationActions.SaveLocationSuccess(response?.body);
            }),
            catchError(({error}) => {
              this.notification.openSnackBar(error?.message, COLOR_SNACK_BAR.RED);
              return of(new locationActions.SaveLocationFail(error));
            })
          );
      })
    )
  );

  delete$ = createEffect(
    () => this.actions$.pipe(
      ofType(locationActions.REMOVE_LOCATION),
      map((action: locationActions.RemoveLocation) => action.payload),
      switchMap((payload) => {
        return this.locationService
          .remove(payload)
          .pipe(
            map(response => {
              const {message} = response?.body;
              this.notification.openSnackBar(message, COLOR_SNACK_BAR.GREEN);
              return new locationActions.RemoveLocationSuccess(response?.body);
            }),
            catchError(({error}) => {
              this.notification.openSnackBar(error?.message, COLOR_SNACK_BAR.RED);
              return of(new locationActions.RemoveLocationFail(error));
            })
          );
      })
    )
  );
}
