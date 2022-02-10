import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {Observable} from 'rxjs';
import {getPrefixID} from '../../constans/prefix-id.const';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class ProjectMissionExistDetailActivate implements CanActivate {
  constructor(private store: Store<fromStore.FeatureState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = route.params.id;
    return this.checkStoreAndGetDetail(id).pipe(
      switchMap(() => this.hasRole(id))
    );
  }

  hasRole(id: number): Observable<boolean> {
    return this.store
      .select(fromStore.getProjectMissionEntitiesState)
      .pipe(
        map((entities: { [key: string]: any }) => entities[getPrefixID(id)]?.isDetail),
        take(1)
      );
  }

  checkStoreAndGetDetail(id: string): Observable<boolean> {
    return this.store.select(fromStore.getProjectMissionEntitiesState).pipe(
      map((entities: { [key: string]: any }) => entities[getPrefixID(id)]?.isDetail),
      tap(isDetailExist => {
        if (!isDetailExist) {
          this.store.dispatch(new fromStore.LoadDetailProjectMission(id));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
