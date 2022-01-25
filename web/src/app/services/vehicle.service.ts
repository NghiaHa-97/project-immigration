import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class VehicleService {
  constructor(private http: HttpClient) {
  }

  getAllVehicle(): Observable<any> {
    return this.http.get(PUBLIC_API.VEHICLE.GET_VEHICLE,
      {
        observe: 'response',
        withCredentials: true
      }
    );
  }
}
