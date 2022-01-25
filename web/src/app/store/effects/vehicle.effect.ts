import {Injectable} from '@angular/core';
import * as fromService from '../../services';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as vehicleActions from '../actions/vehicle.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class VehicleEffect {
  constructor(private actions$: Actions,
              private vehicleService: fromService.VehicleService) {
  }
  getAll$ = createEffect(
    () => this.actions$.pipe(
      ofType(vehicleActions.LOAD_VEHICLE),
      // map((action: cityProvinceActions.LoadCityProvince) => action.payload),
      switchMap(() => {
        return this.vehicleService
          .getAllVehicle()
          .pipe(
            map(response => new vehicleActions.LoadVehicleSuccess(response?.body)),
            catchError(error => of(new vehicleActions.LoadVehicleFail(error)))
          );
      })
    )
  );
}

