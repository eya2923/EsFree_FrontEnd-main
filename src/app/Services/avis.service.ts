import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Covoiturage } from '../Models/covoiturage';
import { Avis } from '../Models/avis';

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  constructor(private httpClient : HttpClient) { }
  baseUrl: string='http://localhost:8082/Avis';
  getListAvis(): Observable<Avis[]> 
  {
    return this.httpClient.get<Avis[]>(this.baseUrl +'/retreiveAvis')
      
  }
  addAvis(avis: Avis,id_cov:any,id:number): Observable<Avis> {
    
    return this.httpClient.post<Avis>(this.baseUrl +'/AddAvis'+'/'+id_cov+'/'+id, avis);
  }
  getAvisByCov(id_cov:any)
  {
  return this.httpClient.get<Avis[]>(this.baseUrl+'/FindByCovoiturage'+'/'+id_cov)
  }
  retrieveAllAvisByUser(id: number): Observable<Avis[]> {
    return this.httpClient.get<Avis[]>(this.baseUrl+`/retrieveAllAvisByUser/${id}`);
  }
  deleteAvis(id_avis: number): Observable<any> {
    const url = `${this.baseUrl}/removeAvis/${id_avis}`;
    return this.httpClient.delete(url);
  }
}
