import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from '@angular/core';
import {RoleUpdateComponent} from '../role-component/role-update.component';
import {Observable} from 'rxjs';

@Injectable()
export class RoleDeactivate implements CanDeactivate<RoleUpdateComponent> {
  constructor() {
  }

  canDeactivate(component: RoleUpdateComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canExit();
  }



}
