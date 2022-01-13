import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class UnitTypeService{
  constructor(private http: HttpClient) {
  }
  getAll(): Observable<any> {
    return this.http
      .get(`${PUBLIC_API.UNIT_TYPE.GET_UNIT_TYPE}`, {observe: 'response', withCredentials: true});
  }
}
