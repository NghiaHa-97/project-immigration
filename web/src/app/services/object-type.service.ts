import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class ObjectTypeService {
  constructor(private http: HttpClient) {
  }

  getAll(payload: any): Observable<any> {
    return this.http
      .get(PUBLIC_API.OBJECT_TYPE.GET_ALL,
        {
          observe: 'response',
          withCredentials: true
        });
  }

  save(payload: any): Observable<any> {
    return this.http
      .post(PUBLIC_API.OBJECT_TYPE.SAVE,
        payload,
        {observe: 'response', withCredentials: true});
  }

  remove(payload: any): Observable<any> {
    return this.http
      .delete(`${PUBLIC_API.OBJECT_TYPE.DELETE}${payload}`,
        {observe: 'response', withCredentials: true});
  }
}
