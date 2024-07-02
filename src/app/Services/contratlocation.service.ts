import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contratlocation } from '../Models/contratlocation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratlocationService {

  private baseUrl : string = 'http://localhost:8082/contratlocation';

  constructor(private http: HttpClient) { }
  findAllContratlocations(): Observable<Contratlocation[]>{
    return this.http.get<Contratlocation[]>(this.baseUrl + '/list');
  }

  addContratlocation(contratlocation : Contratlocation): Observable<Contratlocation>{
    return this.http.post<Contratlocation>(this.baseUrl + '/addContratLocation',contratlocation);
  }

  updateContrat(contratlocation : Contratlocation): Observable<Contratlocation>{
    return this.http.put<Contratlocation>(this.baseUrl + '/updateContratLocation',contratlocation);
  }
  getContratById(contrat_id: number): Observable<Contratlocation> {
    return this.http.get<Contratlocation>(`${this.baseUrl}/getContratLocation/${contrat_id}`);
  }
  deleteContrat(contrat_id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteContratLocation/${contrat_id}`);
  }
  addContratByUserAndMaison(contratLocation :Contratlocation, id: number, idMmaison: number): Observable<Contratlocation>{
    return this.http.post<Contratlocation>(`${this.baseUrl}/addContratMaisonColocataire?id=${id}&idMmaison=${idMmaison}`,contratLocation);
    
  }

  getContratsByUser(id: number): Observable<Contratlocation[]> {
    return this.http.get<Contratlocation[]>(`${this.baseUrl}/contrats?id=${id}`);
  }
}
