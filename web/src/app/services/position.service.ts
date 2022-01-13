import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class PositionService{
  constructor(private http: HttpClient) {
  }
  getByDepartment(payload: any): Observable<any> {
    if (!payload) {
      return of(null);
    }
    return this.http
      .get(`${PUBLIC_API.POSITION.GET_POSITION_BY_DEPARTMENT}${payload}`, {observe: 'response', withCredentials: true});
  }
}
