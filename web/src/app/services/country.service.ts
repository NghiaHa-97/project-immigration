import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class CountryService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http
      .get(`${PUBLIC_API.COUNTRY.GET_COUNTRY}`, {observe: 'response', withCredentials: true});
  }
}
