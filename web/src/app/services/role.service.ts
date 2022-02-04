import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ADMIN_API} from '../constans/url-api.const';
import {createRequestParam} from './create-request-param.function';

@Injectable()
export class RoleService{
  constructor(private http: HttpClient) {
  }

  getPageRole(payload: any): Observable<any> {
    const param = createRequestParam(payload);
    return this.http.get(ADMIN_API.ROLE.GET_PAGE_ROLE,
      {
        params: param,
        observe: 'response',
        withCredentials: true
      }
    );
  }

  getAllRole(): Observable<any> {
    return this.http.get(ADMIN_API.ROLE.GET_ALL_ROLE,
      {
        observe: 'response',
        withCredentials: true
      }
    );
  }

  getRoleDetail(payload: any): Observable<any> {
    return this.http.get(`${ADMIN_API.ROLE.GET_DETAIL_ROLE}${payload}`,
      {
        observe: 'response',
        withCredentials: true
      }
    );
  }

  create(payload: any): Observable<any> {
    return this.http
      .post(ADMIN_API.ROLE.CREATE_ROLE,
        payload,
        {observe: 'response', withCredentials: true});
  }

  edit(payload: any): Observable<any> {
    return this.http
      .put(`${ADMIN_API.ROLE.EDIT_ROLE}${payload.id}`,
        payload,
        {observe: 'response', withCredentials: true});
  }

  remove(payload: any): Observable<any> {
    return this.http
      .delete(`${ADMIN_API.ROLE.DELETE_ROLE}${payload}`,
        {observe: 'response', withCredentials: true});
  }
}
