import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as authActions from '../actions/auth.action';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class AuthEffect {
  constructor(private actions$: Actions,
              private loginService: fromService.AuthService) {
  }

  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(authActions.LOGIN_USER),
      map((action: authActions.Login) => action.payload),
      switchMap((payload) => {
        return this.loginService
          .login(payload)
          .pipe(
            map(userDetail => new authActions.LoginSuccess(userDetail)),
            catchError(error => of(new authActions.LoginFail(error)))
          );
      })
    )
  );

  register$ = createEffect(
    () => this.actions$.pipe(
      ofType(authActions.REGISTER_USER),
      map((action: authActions.Login) => action.payload),
      switchMap((payload) => {
        return this.loginService
          .register(payload)
          .pipe(
            map(() => new authActions.RegisterSuccess(null)),
            catchError(error => of(new authActions.RegisterFail(error))),
            tap((e) => console.log(e))
          );
      })
    )
  );
}
