import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ADMIN_API, PUBLIC_API} from '../constans/url-api.const';
import {createRequestParam} from './create-request-param.function';

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) {
  }

  getAllByProfile(payload: any): Observable<any> {
    const param = createRequestParam(payload);
    return this.http
      .get(PUBLIC_API.COMMENT.GET_ALL_BY_PROFILE_ID,
        {
          params: param,
          observe: 'response',
          withCredentials: true
        });
  }

  getDetailByProfileEmployee(payload: any): Observable<any> {
    const param = createRequestParam(payload);
    return this.http
      .get(PUBLIC_API.COMMENT.GET_DETAIL_BY_PROFILE_EMPLOYEE,
        {
          params: param,
          observe: 'response',
          withCredentials: true
        });
  }

  getDetail(payload: any): Observable<any> {
    return this.http
      .get(`${PUBLIC_API.COMMENT.GET_DETAIL}${payload}`,
        {observe: 'response', withCredentials: true});
  }

  create(payload: any): Observable<any> {
    return this.http
      .post(PUBLIC_API.COMMENT.CREATE,
        payload,
        {observe: 'response', withCredentials: true});
  }
}
