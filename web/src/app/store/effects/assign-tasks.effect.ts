import {Injectable} from '@angular/core';
import * as fromService from '../../services';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as assignTasksActions from '../actions/assign-tasks.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {COLOR_SNACK_BAR, NotificationSnackBar} from '../../notification/notification-snack-bar';

@Injectable()
export class AssignTasksEffect {
  constructor(private actions$: Actions,
              private assignTasksService: fromService.AssignTasksService,
              private notification: NotificationSnackBar) {
  }

  getPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(assignTasksActions.LOAD_ASSIGN_TASKS),
      map((action: assignTasksActions.LoadAssignTasks) => action.payload),
      switchMap((payload) => {
        return this.assignTasksService
          .getPage(payload)
          .pipe(
            map(response => new assignTasksActions.LoadAssignTasksSuccess(response?.body)),
            catchError(error => of(new assignTasksActions.LoadAssignTasksFail(error)))
          );
      })
    )
  );

  getDetail$ = createEffect(
    () => this.actions$.pipe(
      ofType(assignTasksActions.LOAD_DETAIL_ASSIGN_TASKS),
      map((action: assignTasksActions.LoadDetailAssignTasks) => action.payload),
      switchMap((payload) => {
        return this.assignTasksService
          .getDetail(payload)
          .pipe(
            map(response => new assignTasksActions.LoadDetailAssignTasksSuccess(response?.body)),
            catchError(error => of(new assignTasksActions.LoadDetailAssignTasksFail(error)))
          );
      })
    )
  );

  create$ = createEffect(
    () => this.actions$.pipe(
      ofType(assignTasksActions.CREATE_ASSIGN_TASKS),
      map((action: assignTasksActions.CreateAssignTasks) => action.payload),
      switchMap((payload) => {
        return this.assignTasksService
          .create(payload)
          .pipe(
            map(response => {
              const {message} = response?.body;
              this.notification.openSnackBar(message, COLOR_SNACK_BAR.GREEN);
              return new assignTasksActions.CreateAssignTasksSuccess(response?.body);
            }),
            catchError(({error}) => {
              this.notification.openSnackBar(error?.message, COLOR_SNACK_BAR.RED);
              return of(new assignTasksActions.CreateAssignTasksFail(error));
            })
          );
      })
    )
  );

  update$ = createEffect(
    () => this.actions$.pipe(
      ofType(assignTasksActions.UPDATE_ASSIGN_TASKS),
      map((action: assignTasksActions.UpdateAssignTasks) => action.payload),
      switchMap((payload) => {
        return this.assignTasksService
          .edit(payload)
          .pipe(
            map(response => {
              const {message} = response?.body;
              this.notification.openSnackBar(message, COLOR_SNACK_BAR.GREEN);
              return new assignTasksActions.UpdateAssignTasksSuccess(response?.body);
            }),
            catchError(({error}) => {
              this.notification.openSnackBar(error?.message, COLOR_SNACK_BAR.RED);
              return of(new assignTasksActions.UpdateAssignTasksFail(error));
            })
          );
      })
    )
  );

  delete$ = createEffect(
    () => this.actions$.pipe(
      ofType(assignTasksActions.REMOVE_ASSIGN_TASKS),
      map((action: assignTasksActions.RemoveAssignTasks) => action.payload),
      switchMap((payload) => {
        return this.assignTasksService
          .remove(payload)
          .pipe(
            map(response => {
              const {message} = response?.body;
              this.notification.openSnackBar(message, COLOR_SNACK_BAR.GREEN);
              return new assignTasksActions.RemoveAssignTasksSuccess(response?.body);
            }),
            catchError(({error}) => {
              this.notification.openSnackBar(error?.message, COLOR_SNACK_BAR.RED);
              return of(new assignTasksActions.RemoveAssignTasksFail(error));
            })
          );
      })
    )
  );
}
