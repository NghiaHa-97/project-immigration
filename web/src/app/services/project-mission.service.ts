import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {createRequestParam} from './create-request-param.function';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class ProjectMissionService {
  constructor(private http: HttpClient) {
  }

  getPage(payload: any): Observable<any> {
    const param = createRequestParam(payload);
    return this.http
      .get(PUBLIC_API.PROJECT_MISSION.GET_PROJECT_MISSION,
        {
          params: param,
          observe: 'response',
          withCredentials: true
        });
  }

  getDetail(payload: any): Observable<any> {
    return this.http
      .get(`${PUBLIC_API.PROJECT_MISSION.GET_DETAIL_PROJECT_MISSION}${payload}`,
        {observe: 'response', withCredentials: true});
  }

  create(payload: any): Observable<any> {
    return this.http
      .post(PUBLIC_API.PROJECT_MISSION.CREATE_PROJECT_MISSION,
        payload,
        {observe: 'response', withCredentials: true});
  }

  edit(payload: any): Observable<any> {
    return this.http
      .put(`${PUBLIC_API.PROJECT_MISSION.EDIT_PROJECT_MISSION}${payload.id}`,
        payload,
        {observe: 'response', withCredentials: true});
  }

  remove(payload: any): Observable<any> {
    return this.http
      .delete(`${PUBLIC_API.PROJECT_MISSION.DELETE_PROJECT_MISSION}${payload}`,
        {observe: 'response', withCredentials: true});
  }

}

