import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class CityProvinceService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http
      .get(`${PUBLIC_API.CITY_PROVINCE.GET_CITY_PROVINCE}`, {observe: 'response', withCredentials: true});
  }
}
