import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PUBLIC_API} from '../constans/url-api.const';

@Injectable()
export class StatusProfileService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(PUBLIC_API.STATUS_PROFILE.GET_STATUS_PROFILE,
      {
        observe: 'response',
        withCredentials: true
      }
    );
  }
}
