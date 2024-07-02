import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor

} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable , throwError } from 'rxjs';
import { UserService } from './user.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor(private userSrv: UserService) {}

  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localData = localStorage.getItem('token');
console.log("local data");

    console.log(localData);
    
    let token = null;


    if (localData) {
      console.log("localdata:", localData);
      const loggedUserData = JSON.parse(localData);
      console.log("loggedUserData:", loggedUserData);
  
      token = loggedUserData;
      console.log("Token:", token); // Log token to check if it's parsed correctly
    } else {
      console.log("Token not found in local storage");
    }
    
    if (token) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`
          }
      });
  }





    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle error responses
        if (error.status === 401) {
          const isRefresh = confirm("Your Session is Expired. Do you want to Continue?");
          if (isRefresh) {
            this.userSrv.$refreshToken.next(true);
          }
        }
        // Forward the error to the caller
        return throwError(error);
      })
    );
  }
  
}
