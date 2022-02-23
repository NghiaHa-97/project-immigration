import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Observable, of} from 'rxjs';
import {getPrefixID} from '../../constans/prefix-id.const';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {LoadUser} from '../../store';

@Injectable()
export class HasPermissionActivate implements CanActivate {
  constructor(private store: Store<fromStore.RootState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const code = route.data.code;
    return this.checkStoreAndGetDetail().pipe(
      switchMap((principal) => of(principal?.permissionMap?.hasOwnProperty(code)))
    );
  }

  checkStoreAndGetDetail(): Observable<any> {
    return this.store.select(fromStore.getUserDetailState).pipe(
      map((user: any) => user?.principal),
      tap(data => {
        if (!data) {
          this.store.dispatch(new LoadUser());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
