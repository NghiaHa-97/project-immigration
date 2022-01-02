import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as expertsActions from '../actions/experts.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromService from '../../services';

@Injectable()
export class ExpertsEffect {
  constructor(private actions$: Actions,
              private expertsService: fromService.ExpertsService) {
  }

  getPage$ = createEffect(
    () => this.actions$.pipe(
      ofType(expertsActions.LOAD_EXPERTS),
      map((action: expertsActions.LoadExperts) => action.payload),
      switchMap((payload) => {
        return this.expertsService
          .getPage(payload)
          .pipe(
            map(response => new expertsActions.LoadExpertsSuccess(response?.body)),
            catchError(error => of(new expertsActions.LoadExpertsFail(error)))
          );
      })
    )
  );


  getDetail$ = createEffect(
    () => this.actions$.pipe(
      ofType(expertsActions.LOAD_DETAIL_EXPERTS),
      map((action: expertsActions.LoadDetailExperts) => action.payload),
      switchMap((payload) => {
        return this.expertsService
          .getDetail(payload)
          .pipe(
            map(response => new expertsActions.LoadDetailExpertsSuccess(response?.body)),
            catchError(error => of(new expertsActions.LoadDetailExpertsFail(error)))
          );
      })
    )
  );

  create$ = createEffect(
    () => this.actions$.pipe(
      ofType(expertsActions.CREATE_EXPERTS),
      map((action: expertsActions.CreateExperts) => action.payload),
      switchMap((payload) => {
        return this.expertsService
          .create(payload)
          .pipe(
            map(response => new expertsActions.CreateExpertsSuccess(response?.body)),
            catchError(error => of(new expertsActions.CreateExpertsFail(error)))
          );
      })
    )
  );


  update$ = createEffect(
    () => this.actions$.pipe(
      ofType(expertsActions.UPDATE_EXPERTS),
      map((action: expertsActions.UpdateExperts) => action.payload),
      switchMap((payload) => {
        return this.expertsService
          .edit(payload)
          .pipe(
            map(response => new expertsActions.UpdateExpertsSuccess(response?.body)),
            catchError(error => of(new expertsActions.UpdateExpertsFail(error)))
          );
      })
    )
  );

  delete$ = createEffect(
    () => this.actions$.pipe(
      ofType(expertsActions.REMOVE_EXPERTS),
      map((action: expertsActions.RemoveExperts) => action.payload),
      switchMap((payload) => {
        return this.expertsService
          .remove(payload)
          .pipe(
            map(response => new expertsActions.RemoveExpertsSuccess(response?.body)),
            catchError(error => of(new expertsActions.RemoveExpertsFail(error)))
          );
      })
    )
  );


}
