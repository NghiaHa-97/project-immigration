import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as manageUserActions from '../actions/manage-user.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromService from '../../services';

@Injectable()
export class ManageUserEffect {
  constructor(private actions$: Actions,
              private manageUserService: fromService.ManageUserService) {
  }

  getPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(manageUserActions.LOAD_MANAGE_USER),
      map((action: manageUserActions.LoadManageUser) => action.payload),
      switchMap((payload) => {
        return this.manageUserService
          .getPage(payload)
          .pipe(
            map(response => new manageUserActions.LoadManageUserSuccess(response?.body)),
            catchError(error => of(new manageUserActions.LoadManageUserFail(error)))
          );
      })
    )
  );


  getDetail$ = createEffect(
    () => this.actions$.pipe(
      ofType(manageUserActions.LOAD_DETAIL_MANAGE_USER),
      map((action: manageUserActions.LoadDetailManageUser) => action.payload),
      switchMap((payload) => {
        return this.manageUserService
          .getDetail(payload)
          .pipe(
            map(response => new manageUserActions.LoadDetailManageUserSuccess(response?.body)),
            catchError(error => of(new manageUserActions.LoadDetailManageUserFail(error)))
          );
      })
    )
  );

  create$ = createEffect(
    () => this.actions$.pipe(
      ofType(manageUserActions.CREATE_MANAGE_USER),
      map((action: manageUserActions.CreateManageUser) => action.payload),
      switchMap((payload) => {
        return this.manageUserService
          .create(payload)
          .pipe(
            map(response => new manageUserActions.UpdateManageUserSuccess(response?.body)),
            catchError(error => of(new manageUserActions.UpdateManageUserFail(error)))
          );
      })
    )
  );

  // createSuccess$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType(manageUserService.CREATE_EMPLOYEE_SUCCESS),
  //     map((action: manageUserService.CreateEmployeeSuccess) =>
  //       new routerActions.Go({path: ['nhan-vien', 'chi-tiet', action.payload.data.id]})
  //     )
  //   )
  // );

  update$ = createEffect(
    () => this.actions$.pipe(
      ofType(manageUserActions.UPDATE_MANAGE_USER),
      map((action: manageUserActions.UpdateManageUser) => action.payload),
      switchMap((payload) => {
        return this.manageUserService
          .edit(payload)
          .pipe(
            map(response => new manageUserActions.UpdateManageUserSuccess(response?.body)),
            catchError(error => of(new manageUserActions.UpdateManageUserFail(error)))
          );
      })
    )
  );

  delete$ = createEffect(
    () => this.actions$.pipe(
      ofType(manageUserActions.REMOVE_MANAGE_USER),
      map((action: manageUserActions.RemoveManageUser) => action.payload),
      switchMap((payload) => {
        return this.manageUserService
          .remove(payload)
          .pipe(
            map(response => new manageUserActions.RemoveManageUserSuccess(response?.body)),
            catchError(error => of(new manageUserActions.RemoveManageUserFail(error)))
          );
      })
    )
  );
}
