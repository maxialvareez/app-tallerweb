import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: any, next: any) {
      const tokenizeReq = req.clone({
        setHeaders: {
          Authorization: `${this.authService.getToken()}`
        }
      })
      return next.handle(tokenizeReq)
  }
}
