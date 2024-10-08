import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { message } from '../Modules/messages';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private baseUrl : String ="http://172.213.199.57:8082/message";
  constructor(private httpClient : HttpClient) { }
  getListmessage(id:any): Observable<message[]> 
  {
    return this.httpClient.get<message[]>(this.baseUrl +'/retrievebyitem'+'/'+id)
      
  }
  addMessage(message: message , id:any , iduser:any): Observable<message>{
    return this.httpClient.post<message>(this.baseUrl +'/addMessage'+'/'+id+'/'+iduser , message)

  }

  
}
