import { TOKEN_NAME, AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem(TOKEN_NAME); // you probably want to store it in localStorage or something

    if (!token) {
        this.auth.getNewJwt().subscribe(res => {
            this.auth.setToken(res.access_token);
            token = localStorage.getItem(TOKEN_NAME);
        });
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1);
  }

}