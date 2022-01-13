import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class DepartmentService{
  constructor(private http: HttpClient) {
  }
  getByWorkUnit(payload: any): Observable<any> {
    if (!payload) {
      return of(null);
    }
    return this.http
      .get(`${PUBLIC_API.DEPARTMENT.GET_DEPARTMENT_BY_WORK_UNIT}${payload}`, {observe: 'response', withCredentials: true});
  }
}
