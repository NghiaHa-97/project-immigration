import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../store';
import * as fromProcessAction from '../store/actions/process.action';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AppRequestInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromStore.RootState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new fromProcessAction.ProcessStart());
    let httpHeaders = new HttpHeaders();
    const authorization = sessionStorage.getItem('Authorization');
    if (authorization != null) {
      // Bearer authorization
      httpHeaders = httpHeaders.append('Authorization', authorization);
    }
    const requestUpdate = req.clone({
      headers: httpHeaders
    });

    return next.handle(requestUpdate).pipe(
      tap((v) => {
        if (v instanceof HttpResponse ) {
          this.store.dispatch(new fromProcessAction.ProcessStop());
        }
      })
      ,
      catchError(err => {
        this.store.dispatch(new fromProcessAction.ProcessStop());
        return throwError(err);
      })
    );
  }
}
