import {Injectable} from '@angular/core';
import * as fromService from '../../services';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as roleActions from '../actions/role.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class RoleEffect {
  constructor(private actions$: Actions,
              private roleService: fromService.RoleService) {
  }

  getAll$ = createEffect(
    () => this.actions$.pipe(
      ofType(roleActions.LOAD_ALL_ROLE),
      switchMap(() => {
        return this.roleService
          .getAllRole()
          .pipe(
            map(response => new roleActions.LoadAllRoleSuccess(response?.body)),
            catchError(error => of(new roleActions.LoadAllRoleFail(error)))
          );
      })
    )
  );

  getPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(roleActions.LOAD_ROLE),
      switchMap(() => {
        return this.roleService
          .getPageRole()
          .pipe(
            map(response => new roleActions.LoadRoleSuccess(response?.body)),
            catchError(error => of(new roleActions.LoadRoleFail(error)))
          );
      })
    )
  );

  getDetail$ = createEffect(
    () => this.actions$.pipe(
      ofType(roleActions.LOAD_DETAIL_ROLE),
      map((action: roleActions.LoadDetailRole) => action.payload),
      switchMap((payload) => {
        return this.roleService
          .getRoleDetail(payload)
          .pipe(
            map(response => new roleActions.LoadDetailRoleSuccess(response?.body)),
            catchError(error => of(new roleActions.LoadDetailRoleFail(error)))
          );
      })
    )
  );

  create$ = createEffect(
    () => this.actions$.pipe(
      ofType(roleActions.CREATE_ROLE),
      map((action: roleActions.CreateRole) => action.payload),
      switchMap((payload) => {
        return this.roleService
          .create(payload)
          .pipe(
            map(response => new roleActions.CreateRoleSuccess(response?.body)),
            catchError(error => of(new roleActions.CreateRoleFail(error)))
          );
      })
    )
  );

  update$ = createEffect(
    () => this.actions$.pipe(
      ofType(roleActions.UPDATE_ROLE),
      map((action: roleActions.UpdateRole) => action.payload),
      switchMap((payload) => {
        return this.roleService
          .edit(payload)
          .pipe(
            map(response => new roleActions.UpdateRoleSuccess(response?.body)),
            catchError(error => of(new roleActions.UpdateRoleFail(error)))
          );
      })
    )
  );

  delete$ = createEffect(
    () => this.actions$.pipe(
      ofType(roleActions.REMOVE_ROLE),
      map((action: roleActions.RemoveRole) => action.payload),
      switchMap((payload) => {
        return this.roleService
          .remove(payload)
          .pipe(
            map(response => new roleActions.RemoveRoleSuccess(response?.body)),
            catchError(error => of(new roleActions.RemoveRoleFail(error)))
          );
      })
    )
  );
}
