import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromService from '../../services';
import * as moduleActions from '../actions/module.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ModuleEffect {
  constructor(private actions$: Actions,
              private moduleService: fromService.ModuleService) {
  }

  getAll$ = createEffect(
    () => this.actions$.pipe(
      ofType(moduleActions.LOAD_MODULE),
      // map((action: cityProvinceActions.LoadCityProvince) => action.payload),
      switchMap(() => {
        return this.moduleService
          .getAllModuleAndPermission()
          .pipe(
            map(response => new moduleActions.LoadModuleSuccess(response?.body)),
            catchError(error => of(new moduleActions.LoadModuleFail(error)))
          );
      })
    )
  );
}
