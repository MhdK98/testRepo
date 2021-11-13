import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  token: string;
  constructor(private authService: AuthServiceService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = this.authService.getToken();
    if (this.token) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
      return next.handle(tokenizedReq).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 501 || event.status === 403) {
         //   this.authService.LogOut();
            this.router.navigateByUrl('/login');
          }else{
           // alert("error = "+event.status);
          }
        }
        return event;
      }));
    }
    return next.handle(req);
  }
}
