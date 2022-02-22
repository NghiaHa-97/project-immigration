import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {createRequestParam} from './create-request-param.function';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {
  }

  getPage(payload: any): Observable<any> {
    const param = createRequestParam(payload);
    return this.http
      .get(PUBLIC_API.PROFILE.GET_PROFILE,
        {
          params: param,
          observe: 'response',
          withCredentials: true
        });
  }

  getDetail(payload: any): Observable<any> {
    return this.http
      .get(`${PUBLIC_API.PROFILE.GET_DETAIL_PROFILE}${payload}`,
        {observe: 'response', withCredentials: true});
  }

  create(payload: any): Observable<any> {
    return this.http
      .post(PUBLIC_API.PROFILE.CREATE_PROFILE,
        payload,
        {observe: 'response', withCredentials: true});
  }

  edit(payload: any): Observable<any> {
    return this.http
      .put(`${PUBLIC_API.PROFILE.EDIT_PROFILE}${payload.id}`,
        payload,
        {observe: 'response', withCredentials: true});
  }

  editStatus(payload: any): Observable<any> {
    return this.http
      .put(`${PUBLIC_API.PROFILE.EDIT_STATUS}${payload.id}`,
        payload,
        {observe: 'response', withCredentials: true});
  }

  remove(payload: any): Observable<any> {
    return this.http
      .delete(`${PUBLIC_API.PROFILE.DELETE_PROFILE}${payload}`,
        {observe: 'response', withCredentials: true});
  }

}

