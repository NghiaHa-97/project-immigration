import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class WorkUnitService{
  constructor(private http: HttpClient) {
  }
  getByUnitType(payload: any): Observable<any> {
    if (!payload) {
      return of(null);
    }
    return this.http
      .get(`${PUBLIC_API.WORK_UNIT.GET_WORK_UNIT_BY_UNIT_TYPE}${payload}`, {observe: 'response', withCredentials: true});
  }
}
