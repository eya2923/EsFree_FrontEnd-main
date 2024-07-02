import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent implements OnInit {
  userId = localStorage.getItem('angular17TokenUserId');
  id!: number
  constructor(private router :Router ){}
  ngOnInit(): void {
    
      if(this.userId ){
      this.id=parseFloat(this.userId)
      console.log("userId",this.id)
   }
    
  }
  
  


logOut() {
 
    localStorage.removeItem('token');
    localStorage.removeItem('angular17TokenUserId');
    localStorage.removeItem('angular17TokenEmail');
    localStorage.removeItem('name');
    localStorage.removeItem('image');
    localStorage.removeItem('role');
 // Redirect to login page
 this.router.navigate(['']);
}


}
