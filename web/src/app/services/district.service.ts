import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class DistrictService{
  constructor(private http: HttpClient) {
  }
  getByCityProvince(payload: any): Observable<any> {
    if (!payload) {
      return of(null);
    }
    return this.http
      .get(`${PUBLIC_API.DISTRICT.GET_DISTRICT_BY_CITY_PROVINCE}${payload}`, {observe: 'response', withCredentials: true});
  }
}
