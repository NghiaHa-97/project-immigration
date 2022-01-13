import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class CommuneWardService {
  constructor(private http: HttpClient) {
  }

  getByDistrict(payload: any): Observable<any> {
    if (!payload) {
      return of(null);
    }
    return this.http
      .get(`${PUBLIC_API.COMMUNE_WARD.GET_COMMUNE_WARD_BY_DISTRICT}${payload}`, {
        observe: 'response',
        withCredentials: true
      });
  }
}
