import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PageComponentModule} from '../page-component/page-component.module';
import {Observable} from 'rxjs';
import {createRequestParam} from './create-request-param.function';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class ExpertsService{
  constructor(private http: HttpClient) {
  }

  getPage(payload: any): Observable<any> {
    const param = createRequestParam(payload);
    return this.http
      .get(PUBLIC_API.EXPERTS.GET_EXPERTS,
        {
          params: param,
          observe: 'response',
          withCredentials: true
        });
  }

  getDetail(payload: any): Observable<any> {
    return this.http
      .get(`${PUBLIC_API.EXPERTS.GET_DETAIL_EXPERTS}${payload}`, {observe: 'response', withCredentials: true});
  }

  create(payload: any): Observable<any> {
    return this.http
      .post(PUBLIC_API.EXPERTS.CREATE_EXPERTS,
        payload,
        {observe: 'response', withCredentials: true});
  }

  edit(payload: any): Observable<any> {
    return this.http
      .put(`${PUBLIC_API.EXPERTS.EDIT_EXPERTS}${payload.id}`,
        payload.form,
        {observe: 'response', withCredentials: true});
  }

  remove(payload: any): Observable<any> {
    return this.http
      .delete(`${PUBLIC_API.EXPERTS.DELETE_EXPERTS}${payload}`,
        {observe: 'response', withCredentials: true});
  }
}
