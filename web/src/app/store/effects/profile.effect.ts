import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as profileActions from '../actions/profile.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromService from '../../services';

@Injectable()
export class ProfileEffect {
  constructor(private actions$: Actions,
              private profileService: fromService.ProfileService) {
  }

  getPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(profileActions.LOAD_PROFILE),
      map((action: profileActions.LoadProfile) => action.payload),
      switchMap((payload) => {
        return this.profileService
          .getPage(payload)
          .pipe(
            map(response => new profileActions.LoadProfileSuccess(response?.body)),
            catchError(error => of(new profileActions.LoadProfileFail(error)))
          );
      })
    )
  );


  getDetail$ = createEffect(
    () => this.actions$.pipe(
      ofType(profileActions.LOAD_DETAIL_PROFILE),
      map((action: profileActions.LoadDetailProfile) => action.payload),
      switchMap((payload) => {
        return this.profileService
          .getDetail(payload)
          .pipe(
            map(response => new profileActions.LoadDetailProfileSuccess(response?.body)),
            catchError(error => of(new profileActions.LoadDetailProfileFail(error)))
          );
      })
    )
  );

  create$ = createEffect(
    () => this.actions$.pipe(
      ofType(profileActions.CREATE_PROFILE),
      map((action: profileActions.CreateProfile) => action.payload),
      switchMap((payload) => {
        return this.profileService
          .create(payload)
          .pipe(
            map(response => new profileActions.CreateProfileSuccess(response?.body)),
            catchError(error => of(new profileActions.CreateProfileFail(error)))
          );
      })
    )
  );

  update$ = createEffect(
    () => this.actions$.pipe(
      ofType(profileActions.UPDATE_PROFILE),
      map((action: profileActions.UpdateProfile) => action.payload),
      switchMap((payload) => {
        return this.profileService
          .edit(payload)
          .pipe(
            map(response => new profileActions.UpdateProfileSuccess(response?.body)),
            catchError(error => of(new profileActions.UpdateProfileFail(error)))
          );
      })
    )
  );

  delete$ = createEffect(
    () => this.actions$.pipe(
      ofType(profileActions.REMOVE_PROFILE),
      map((action: profileActions.RemoveProfile) => action.payload),
      switchMap((payload) => {
        return this.profileService
          .remove(payload)
          .pipe(
            map(response => new profileActions.RemoveProfileSuccess(response?.body)),
            catchError(error => of(new profileActions.RemoveProfileFail(error)))
          );
      })
    )
  );


}
