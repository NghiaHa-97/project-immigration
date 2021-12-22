import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ADMIN_API, PUBLIC_API} from '../constans/url-api.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(payload: any): Observable<any> {
    return this.http
      .post(ADMIN_API.LOGIN, payload, { observe: 'response', withCredentials: true });
  }

  register(payload: any): Observable<any> {
    return this.http
      .post(ADMIN_API.REGISTER, payload, { observe: 'response', withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http
      .get(ADMIN_API.LOGOUT, { observe: 'response', withCredentials: true });
  }

  loadUser(): Observable<any> {
    return this.http
      .get(ADMIN_API.LOAD_USER, { observe: 'response', withCredentials: true });
  }

}
