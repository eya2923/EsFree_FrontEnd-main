import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserUpdateData } from 'src/app/Modal/UserUpdateData';
import { UserS, role } from 'src/app/Modal/userS';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-g-user',
  templateUrl: './g-user.component.html',
  styleUrls: ['./g-user.component.css']
})
export class GUserComponent implements OnInit {
  public userss: Array<UserS> =[];
  searchTerm: string = '';
  public paginatedUsers: UserS[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 5; // Adjust this value as needed
  public totalPages: number = 0;
  public pages: number[] = [];

  selectedRole: string = '';



  filterUsers(): void {
    if (!this.searchTerm) {
      // If the search term is empty, show all users
      this.paginatedUsers = this.userss.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    } else {
      // Filter users based on the search term
      this.paginatedUsers = this.userss.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  
  onEtatChange(event: any) {
    this.user.role = event.target.value; // Update selectedRole with the value from the event
  }

  deleteUser(userId: number) {
  this.userservice.deleteUser(userId).subscribe(
    (data) => {
      // Update the user list after successful deletion
      location.reload();
      console.log('User deleted successfully:', data);
     
    },
    (error) => {
      console.error('Error deleting user:', error);
    }
  );
 
}
addUser() {
  if (this.file !== undefined) {
    const userData = new UserUpdateData(this.user);
    console.log(this.user);
    
    // Create UserUpdateData object with necessary properties
    this.userservice.addUser(userData, this.file).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        // Perform any additional actions after updating user
        location.reload();
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

  file: File | undefined;
  click: any;

onFileSelected(event: any) {
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







etatOptions = Object.values(role);
user : UserS = new UserS();
users: UserS[] | undefined;
selectedEtat!: role;
 


  constructor (private userservice:UserService , private route :Router){}
  
  ngOnInit(): void {


 this.loaduser(); 
 this.filterUsers();
  }

  loaduser(): void {
    this.userservice.GetUsers().subscribe(
      (data) => {
        this.userss = data;
        
        console.log(this.users);
        this.totalPages = Math.ceil(this.userss.length / this.itemsPerPage);
        this.updatePagination();

        
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  





  openUpdateModal(user: UserS) {
    console.log('Selected user:', user);
    this.user = new UserS(); // Create a new instance
    Object.assign(this.user, user); // Copy properties from selected pubItem
   
  }

  
  updatePagination(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
    this.paginatedUsers = this.userss.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }
  
  changePage(page: number): void {
    this.currentPage = page;
    this.paginatedUsers = this.userss.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }
}
