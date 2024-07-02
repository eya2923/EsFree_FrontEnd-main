import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserUpdateData } from 'src/app/Modal/UserUpdateData';
import { User } from 'src/app/Modal/user';
import { UserS } from 'src/app/Modal/userS';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  selectedRole: string = '';


  openUpdateModal(users: UserS) {
    console.log('Selected user:', users);
    this.user = new UserS(); // Create a new instance
    Object.assign(this.user, users); // Copy properties from selected pubItem
   
  }

  file: File | undefined;
  click: any;

onFileSelected1(event: any) {
 this.file = event.target.files[0];
}

  updateUser(): void {
    if (this.file !== undefined) {
      const userData = new UserUpdateData(this.user); // Create UserUpdateData object with necessary properties
      this.userservice.updateUser(userData, this.file).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          location.reload();
  
  
          // Perform any additional actions after updating user
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.error('No file selected.');
      // Optionally, you can display a message to the user indicating that no file was selected
    }
  }

users : UserS = new UserS();

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('angular17TokenUserId');
    localStorage.removeItem('angular17TokenEmail');
  
    // Redirect to login page
    this.router.navigate(['/login']);
  }
  user!: UserS  ;

  constructor( private userservice:UserService , private router :Router) {}
  ngOnInit(): void {
   this.getusers() ;
  }

 



  
  onEtatChange(event: any) {
    this.user.role = event.target.value; // Update selectedRole with the value from the event
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const userId = localStorage.getItem('angular17TokenUserId');
      if (userId !== null) { // Check if userId is not null
        this.uploadImage(file, parseFloat(userId));
        location.reload();
      
        
      } else {
        console.error('User ID not found in local storage');
      }
    }
  }

  uploadImage(image: File , id :number) {
    this.userservice.uploadImage(image , id).subscribe(
      (data: any) => {
        this.user = data.user; // Assuming the response contains updated user details
        localStorage.setItem('image', data.image);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  getusers(){
    const userId = localStorage.getItem('angular17TokenUserId'); // Retrieve user ID from local storage
    console.log("assleemaa ");
    console.log(userId);
    if (userId) {
      this.userservice.GetUser(parseFloat(userId)).subscribe(
        (data: User) => {
          this.user = data;
          console.log(this.user);
          
        },
        (error) => {
          console.error(error);
        }
      );
       // Fetch user details using retrieved user ID
    } else {
      console.error('User ID not found in local storage');
    }
  }
  
  


}
