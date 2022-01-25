import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ADMIN_API} from '../constans/url-api.const';
import {createRequestParam} from './create-request-param.function';

@Injectable()
export class ManageUserService {
  constructor(private http: HttpClient) {
  }

  getPage(payload: any): Observable<any> {
    const param = createRequestParam(payload);
    return this.http
      .get(ADMIN_API.MANAGE_USER.GET_PAGE_USER_CUSTOMER,
        {
          params: param,
          observe: 'response',
          withCredentials: true
        });
  }

  getDetail(payload: any): Observable<any> {
    return this.http
      .get(`${ADMIN_API.MANAGE_USER.GET_DETAIL_BY_ID}${payload}`, {observe: 'response', withCredentials: true});
  }

  create(payload: any): Observable<any> {
    return this.http
      .post(ADMIN_API.MANAGE_USER.CREATE,
        payload,
        {observe: 'response', withCredentials: true});
  }

  edit(payload: any): Observable<any> {
    return this.http
      .put(`${ADMIN_API.MANAGE_USER.EDIT}${payload.id}`,
        payload.form,
        {observe: 'response', withCredentials: true});
  }

  remove(payload: any): Observable<any> {
    return this.http
      .delete(`${ADMIN_API.MANAGE_USER.DELETE}${payload}`,
        {observe: 'response', withCredentials: true});
  }
}
