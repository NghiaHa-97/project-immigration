import {Injectable} from '@angular/core';
import * as fromService from '../../services';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as commentActions from '../actions/comment.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {COLOR_SNACK_BAR, NotificationSnackBar} from '../../notification/notification-snack-bar';

@Injectable()
export class CommentEffect {
  constructor(private actions$: Actions,
              private commentService: fromService.CommentService,
              private notification: NotificationSnackBar) {
  }

  getAllByProfile$ = createEffect(
    () => this.actions$.pipe(
      ofType(commentActions.LOAD_COMMENT_BY_PROFILE),
      map((action: commentActions.LoadCommentByProfIle) => action.payload),
      switchMap((payload) => {
        return this.commentService
          .getAllByProfile(payload)
          .pipe(
            map(response => new commentActions.LoadCommentByProfIleSuccess(response?.body)),
            catchError(error => of(new commentActions.LoadCommentByProfIleFail(error)))
          );
      })
    )
  );

  getCommentByProfileEmployee$ = createEffect(
    () => this.actions$.pipe(
      ofType(commentActions.LOAD_COMMENT_BY_PROFILE_EMPLOYEE),
      map((action: commentActions.LoadCommentByProfileEmployee) => action.payload),
      switchMap((payload) => {
        return this.commentService
          .getDetailByProfileEmployee(payload)
          .pipe(
            map(response => new commentActions.LoadCommentByProfileEmployeeSuccess(response?.body)),
            catchError(error => of(new commentActions.LoadCommentByProfileEmployeeFail(error)))
          );
      })
    )
  );

  getDetail$ = createEffect(
    () => this.actions$.pipe(
      ofType(commentActions.LOAD_DETAIL_COMMENT),
      map((action: commentActions.LoadDetailComment) => action.payload),
      switchMap((payload) => {
        return this.commentService
          .getDetail(payload)
          .pipe(
            map(response => new commentActions.LoadDetailCommentSuccess(response?.body)),
            catchError(error => of(new commentActions.LoadDetailCommentFail(error)))
          );
      })
    )
  );

  create$ = createEffect(
    () => this.actions$.pipe(
      ofType(commentActions.CREATE_COMMENT),
      map((action: commentActions.CreateComment) => action.payload),
      switchMap((payload) => {
        return this.commentService
          .create(payload)
          .pipe(
            map(response => {
              const {message} = response?.body;
              this.notification.openSnackBar(message, COLOR_SNACK_BAR.GREEN);
              return new commentActions.CreateCommentSuccess(response?.body);
            }),
            catchError(({error}) => {
              this.notification.openSnackBar(error?.message, COLOR_SNACK_BAR.RED);
              return of(new commentActions.CreateCommentFail(error));
            })
          );
      })
    )
  );
}
