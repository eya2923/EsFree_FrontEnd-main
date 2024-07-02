import { Component } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserS } from 'src/app/Modal/userS';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupp',
  templateUrl: './signupp.component.html',
  styleUrls: ['./signupp.component.css']
})
export class SignuppComponent {

  user: UserS = new UserS() ;
  signupMessage: string = '';
  constructor(private userservice : UserService ,  private snackBar: MatSnackBar , private router :Router){

   


  }signup() {
    this.user.role = "USER";
    console.log(this.user);
    
    this.userservice.signup(this.user).subscribe((res: any) => {
      console.log(res);
      if (res.statusCode === 200) {
        this.openSnackBar(res.message, 'success-snackbar');
        this.router.navigate(['/login'])
      } else {
        this.openSnackBar(res.message, 'error-snackbar');
      }
    }, error => {
      console.error(error); // Log any errors
      this.openSnackBar('An error occurred. Please try again later.', 'error-snackbar');
    });
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: [panelClass],
      verticalPosition: 'top' // Position the snackbar at the top
    });
  }

}
