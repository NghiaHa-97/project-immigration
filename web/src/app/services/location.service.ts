import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {createRequestParam} from './create-request-param.function';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {
  }

  getPage(payload: any): Observable<any> {
    const param = createRequestParam(payload);
    return this.http
      .get(PUBLIC_API.LOCATION.GET_PAGE,
        {
          params: param,
          observe: 'response',
          withCredentials: true
        });
  }

  view(payload: any): Observable<any> {
    const param = createRequestParam(payload);
    return this.http
      .get(PUBLIC_API.LOCATION.VIEW,
        {
          params: param,
          observe: 'response',
          withCredentials: true
        });
  }

  getDetail(payload: any): Observable<any> {
    return this.http
      .get(`${PUBLIC_API.LOCATION.DETAIL}${payload}`, {observe: 'response', withCredentials: true});
  }

  save(payload: any): Observable<any> {
    return this.http
      .post(PUBLIC_API.LOCATION.SAVE,
        payload,
        {observe: 'response', withCredentials: true});
  }

  remove(payload: any): Observable<any> {
    return this.http
      .delete(`${PUBLIC_API.LOCATION.DELETE}${payload}`,
        {observe: 'response', withCredentials: true});
  }
}
