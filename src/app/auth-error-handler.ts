import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private auth: AuthService) { }

  handleError(error) {
    const router = this.injector.get(Router);
    console.error(error);
    if (error.status === 401 || error.status === 403) {
      this.auth.getNewJwt().subscribe(
        res => {
          this.auth.setToken(res.access_token);
          router.navigate(['/welcome']);
        }
      );
    }
    
    throw error;
  }
}
