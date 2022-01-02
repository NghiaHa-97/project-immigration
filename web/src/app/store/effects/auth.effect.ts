import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as authActions from '../actions/auth.action';
import * as routerActions from '../actions/router.action';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class AuthEffect {
  constructor(private actions$: Actions,
              private authService: fromService.AuthService) {
  }

  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(authActions.LOGIN_USER),
      map((action: authActions.Login) => action.payload),
      switchMap((payload) => {
        return this.authService
          .login(payload)
          .pipe(
            map(response => new authActions.LoginSuccess(response?.body)),
            tap((response) => {
              if (response instanceof authActions.LoginSuccess) {
                sessionStorage.setItem("Authorization", response?.payload?.details)
              }
            }),
            catchError(error => of(new authActions.LoginFail(error)))
          );
      })
    )
  );

  loginSuccess$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(authActions.LOGIN_USER_SUCCESS),
      map(() =>
        new routerActions.Go({path: ["ho-so"]})
      )
    )
  );

  register$ = createEffect(
    () => this.actions$.pipe(
      ofType(authActions.REGISTER_USER),
      map((action: authActions.Login) => action.payload),
      switchMap((payload) => {
        return this.authService
          .register(payload)
          .pipe(
            map(() => new authActions.RegisterSuccess(null)),
            catchError(error => of(new authActions.RegisterFail(error))),
          );
      })
    )
  );

  registerSuccess$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(authActions.REGISTER_USER_SUCCESS),
      map(() =>
        new routerActions.Go({path: ["login"]})
      )
    )
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(authActions.LOGOUT_USER),
      switchMap(() => {
        return this.authService
          .logout()
          .pipe(
            map((response) => new authActions.LogoutSuccess(response?.body)),
            tap((response) => {
              if (response instanceof authActions.LogoutSuccess) {
                sessionStorage.removeItem("Authorization");
              }
            }),
            catchError(error =>  of(new authActions.LogoutFail(error)))
          );
      })
    )
  );

  logoutSuccess$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(authActions.LOGOUT_USER_SUCCESS),
      map(() =>
        new routerActions.Go({path: ["login"]})
      )
    )
  );

  loadUserDetail$ = createEffect(
    () => this.actions$.pipe(
      ofType(authActions.LOAD_USER),
      map((action: authActions.LoadUser) => null),
      switchMap(() => {
        return this.authService
          .loadUser()
          .pipe(
            map(response => new authActions.LoadUserSuccess(response?.body)),
            catchError(error => of(new authActions.LoadUserFail(error)))
          );
      })
    )
  );
}
