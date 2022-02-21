import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ADMIN_API, PUBLIC_API} from '../constans/url-api.const';
import {createRequestParam} from './create-request-param.function';

@Injectable()
export class AssignTasksService {
  constructor(private http: HttpClient) {
  }

  getPage(payload: any): Observable<any> {
    const param = createRequestParam(payload);
    return this.http
      .get(PUBLIC_API.ASSIGN_TASKS.GET_PAGE,
        {
          params: param,
          observe: 'response',
          withCredentials: true
        });
  }

  getDetail(payload: any): Observable<any> {
    return this.http
      .get(`${PUBLIC_API.ASSIGN_TASKS.GET_DETAIL}${payload}`,
        {observe: 'response', withCredentials: true});
  }

  create(payload: any): Observable<any> {
    return this.http
      .post(PUBLIC_API.ASSIGN_TASKS.CREATE,
        payload,
        {observe: 'response', withCredentials: true});
  }

  edit(payload: any): Observable<any> {
    return this.http
      .put(`${PUBLIC_API.ASSIGN_TASKS.EDIT}${payload.id}`,
        payload,
        {observe: 'response', withCredentials: true});
  }

  remove(payload: any): Observable<any> {
    return this.http
      .delete(`${PUBLIC_API.ASSIGN_TASKS.DELETE}${payload}`,
        {observe: 'response', withCredentials: true});
  }
}
