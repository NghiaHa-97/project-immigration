import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AppRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let httpHeaders = new HttpHeaders();
    const authorization = sessionStorage.getItem('Authorization');
    if (authorization != null) {
      // Bearer authorization
      httpHeaders = httpHeaders.append('Authorization', authorization);
    }
    const requestUpdate = req.clone({
      headers: httpHeaders
    });

    return next.handle(requestUpdate);
  }
}
