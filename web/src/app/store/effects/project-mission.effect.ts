import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as projectMissionActions from '../actions/project-mission.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromService from '../../services';
import {COLOR_SNACK_BAR, NotificationSnackBar} from '../../notification/notification-snack-bar';


@Injectable()
export class ProjectMissionEffect {
  constructor(private actions$: Actions,
              private projectMissionService: fromService.ProjectMissionService,
              private notification: NotificationSnackBar) {
  }

  getPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(projectMissionActions.LOAD_PROJECT_MISSION),
      map((action: projectMissionActions.LoadProjectMission) => action.payload),
      switchMap((payload) => {
        return this.projectMissionService
          .getPage(payload)
          .pipe(
            map(response => new projectMissionActions.LoadProjectMissionSuccess(response?.body)),
            catchError(error => of(new projectMissionActions.LoadProjectMissionFail(error)))
          );
      })
    )
  );


  getDetail$ = createEffect(
    () => this.actions$.pipe(
      ofType(projectMissionActions.LOAD_DETAIL_PROJECT_MISSION),
      map((action: projectMissionActions.LoadDetailProjectMission) => action.payload),
      switchMap((payload) => {
        return this.projectMissionService
          .getDetail(payload)
          .pipe(
            map(response => new projectMissionActions.LoadDetailProjectMissionSuccess(response?.body)),
            catchError(error => of(new projectMissionActions.LoadDetailProjectMissionFail(error)))
          );
      })
    )
  );

  create$ = createEffect(
    () => this.actions$.pipe(
      ofType(projectMissionActions.CREATE_PROJECT_MISSION),
      map((action: projectMissionActions.CreateProjectMission) => action.payload),
      switchMap((payload) => {
        return this.projectMissionService
          .create(payload)
          .pipe(
            map(response => {
              const {message} = response?.body;
              this.notification.openSnackBar(message, COLOR_SNACK_BAR.GREEN);
              return new projectMissionActions.CreateProjectMissionSuccess(response?.body);
            }),
            catchError(({error}) => {
              this.notification.openSnackBar(error?.message, COLOR_SNACK_BAR.RED);
              return of(new projectMissionActions.CreateProjectMissionFail(error));
            })
          );
      })
    )
  );

  update$ = createEffect(
    () => this.actions$.pipe(
      ofType(projectMissionActions.UPDATE_PROJECT_MISSION),
      map((action: projectMissionActions.UpdateProjectMission) => action.payload),
      switchMap((payload) => {
        return this.projectMissionService
          .edit(payload)
          .pipe(
            map(response => {
              const {message} = response?.body;
              this.notification.openSnackBar(message, COLOR_SNACK_BAR.GREEN);
              return new projectMissionActions.UpdateProjectMissionSuccess(response?.body);
            }),
            catchError(({error}) => {
              this.notification.openSnackBar(error?.message, COLOR_SNACK_BAR.RED);
              return of(new projectMissionActions.UpdateProjectMissionFail(error));
            })
          );
      })
    )
  );

  delete$ = createEffect(
    () => this.actions$.pipe(
      ofType(projectMissionActions.REMOVE_PROJECT_MISSION),
      map((action: projectMissionActions.RemoveProjectMission) => action.payload),
      switchMap((payload) => {
        return this.projectMissionService
          .remove(payload)
          .pipe(
            map(response => {
              const {message} = response?.body;
              this.notification.openSnackBar(message, COLOR_SNACK_BAR.GREEN);
              return new projectMissionActions.RemoveProjectMissionSuccess(response?.body);
            }),
            catchError(({error}) => {
              this.notification.openSnackBar(error?.message, COLOR_SNACK_BAR.RED);
              return of(new projectMissionActions.RemoveProjectMissionFail(error));
            })
          );
      })
    )
  );
}
