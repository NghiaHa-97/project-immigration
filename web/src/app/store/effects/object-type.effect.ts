import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as objectTypeActions from '../actions/object-type.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromService from '../../services';
import {COLOR_SNACK_BAR, NotificationSnackBar} from '../../notification/notification-snack-bar';

@Injectable()
export class ObjectTypeEffect {
  constructor(private actions$: Actions,
              private objectTypeService: fromService.ObjectTypeService,
              private notification: NotificationSnackBar) {
  }

  getPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(objectTypeActions.LOAD_OBJECT_TYPE),
      map((action: objectTypeActions.LoadObjectType) => action.payload),
      switchMap((payload) => {
        return this.objectTypeService
          .getAll(payload)
          .pipe(
            map(response => new objectTypeActions.LoadObjectTypeSuccess(response?.body)),
            catchError(error => of(new objectTypeActions.LoadObjectTypeFail(error)))
          );
      })
    )
  );


  save$ = createEffect(
    () => this.actions$.pipe(
      ofType(objectTypeActions.SAVE_OBJECT_TYPE),
      map((action: objectTypeActions.SaveObjectType) => action.payload),
      switchMap((payload) => {
        return this.objectTypeService
          .save(payload)
          .pipe(
            map(response => {
              const {message} = response?.body;
              this.notification.openSnackBar(message, COLOR_SNACK_BAR.GREEN);
              return new objectTypeActions.SaveObjectTypeSuccess(response?.body);
            }),
            catchError(({error}) => {
              this.notification.openSnackBar(error?.message, COLOR_SNACK_BAR.RED);
              return of(new objectTypeActions.SaveObjectTypeFail(error));
            })
          );
      })
    )
  );

  delete$ = createEffect(
    () => this.actions$.pipe(
      ofType(objectTypeActions.REMOVE_OBJECT_TYPE),
      map((action: objectTypeActions.RemoveObjectType) => action.payload),
      switchMap((payload) => {
        return this.objectTypeService
          .remove(payload)
          .pipe(
            map(response => {
              const {message} = response?.body;
              this.notification.openSnackBar(message, COLOR_SNACK_BAR.GREEN);
              return new objectTypeActions.RemoveObjectTypeSuccess(response?.body);
            }),
            catchError(({error}) => {
              this.notification.openSnackBar(error?.message, COLOR_SNACK_BAR.RED);
              return of(new objectTypeActions.RemoveObjectTypeFail(error));
            })
          );
      })
    )
  );
}
