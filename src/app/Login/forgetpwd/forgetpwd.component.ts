import { Component } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-forgetpwd',
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['./forgetpwd.component.css']
})
export class ForgetpwdComponent {

  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private authService : UserService ){}
  forgotPassword() {
    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.errorMessage = 'invalid email';
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.successMessage = 'message sent';
      }
    );
  }

}
