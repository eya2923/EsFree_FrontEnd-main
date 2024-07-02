import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { lostandfound } from '../Modules/LostandFound';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LostandfoundService {

  private baseUrl : String ="http://localhost:8082/LostandFound";
  constructor(private httpClient : HttpClient) { }
  
  
  getListItem(): Observable<lostandfound[]> 
  {
    return this.httpClient.get<lostandfound[]>(this.baseUrl +'/retrieveAllPubs')
      
  }
  getItembyId(id:any):Observable<lostandfound>{
    return this.httpClient.get<lostandfound>(this.baseUrl +'/retrievepub'+'/'+id)
  }

  getItemsbyIdUser(id:any):Observable<lostandfound[]>{
    return this.httpClient.get<lostandfound[]>(this.baseUrl +'/retrievebyUser'+'/'+id)
  }

  addItem(lostandfound: lostandfound , file: File , id : number ): Observable<lostandfound> {
    const url = `${this.baseUrl}/addPub/${id}`;

    // Create a FormData object
    let formData: FormData = new FormData();

    // Append the file to the FormData object
    formData.append('file', file);

    // Append the entire lostandfound object as a JSON string to FormData
    formData.append('lostandfound', JSON.stringify(lostandfound));

    // Send POST request with FormData as the body
    return this.httpClient.post<lostandfound>(url, formData );
}
  
  
  deleteItem(iditem: any): Observable<any> {
    const url = `${this.baseUrl}/removePub/${iditem}`;
    return this.httpClient.delete(url);
  }
  changestatus(id: any): Observable<any> {
    const url = `${this.baseUrl}/changestatus/${id}`;
    return this.httpClient.put(url, id);
  }

  updateItem(lostandfound : lostandfound): Observable<any> {
    const url = `${this.baseUrl}/updatePub`;
    return this.httpClient.put(url, lostandfound);
  }
}
