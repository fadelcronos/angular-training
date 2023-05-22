import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    const cloneReq = req.clone(
      {
        headers: req.headers.append('Basic', 'w3er3rar3-3r2q3r')
      }
    )
    return next.handle(cloneReq);
  }
} {

}
