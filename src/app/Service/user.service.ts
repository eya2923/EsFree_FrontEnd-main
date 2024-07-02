import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../Modal/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  haveaccess(): boolean {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
   console.log(token);
   
    return !!token; // Convert token to boolean (true if token exists, false otherwise)
  }
  public $refreshToken = new Subject<boolean>;
  public $refreshTokenReceived = new Subject<boolean>;

  constructor(private http: HttpClient) { 
    this.$refreshToken.subscribe((res:any)=> {
   this.getRefreshToken()
 })
  }

  
  onLogin(obj: any)   {
    return this.http.post("http://localhost:8082/auth/signin", obj)
   
    
  }
  signup(obj: any)   {
    return this.http.post("http://localhost:8082/auth/signup", obj)
   
    
  }
  
  GetUsers(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8082/admin/getUsers')
  }
  GetUser(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8082/admin/getUserById/${id}`);
  }

  addUser(user: any, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    formData.append('user', JSON.stringify(user));
    return this.http.post<any>(`http://localhost:8082/public/addUser`, formData);
  }

  updateUser(user: any, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    formData.append('user', JSON.stringify(user));
    return this.http.post<any>(`http://localhost:8082/public/update`, formData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8082/deleteUser/${id}`);
  }



  uploadImage(image: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', userId.toString());

    // Assuming this endpoint uploads the image and returns updated user details
    return this.http.post<any>('http://localhost:8082/public/addimage', formData);
  }

  forgotPassword(email: string): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    return this.http.post<any>(`http://localhost:8082/auth/forgotPassword`, formData);
  }





  getRefreshToken()   {
    debugger;
    let loggedUserData : any;
    const localData =   localStorage.getItem('token');
    if(localData != null) {
      loggedUserData =  JSON.parse(localData);
    }
    const obj = {
    
      "refreshToken": loggedUserData
    };
    this.http.post("http://localhost:8082/auth/refresh", obj).subscribe((Res:any)=>{
      localStorage.setItem('token', JSON.stringify(Res.data));
      this.$refreshTokenReceived.next(true);
    })
  }
}
