import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ADMIN_API} from '../constans/url-api.const';

@Injectable()
export class ModuleService {
  constructor(private http: HttpClient) {
  }

  getAllModuleAndPermission(): Observable<any> {
    return this.http.get(ADMIN_API.MODULE.GET_ALL_MODULE,
      {
        observe: 'response',
        withCredentials: true
      }
    );
  }
}
