import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service';


export const authGuard: CanActivateFn = (route, state) => {

  const currentmenu = route.url[0].path;
  const router = inject(Router);
  const service = inject(UserService);

  if (service.haveaccess()) {
    return true;
   
  } else {
    alert('access denied');
    router.navigate(['']);
    return false;
  }
}