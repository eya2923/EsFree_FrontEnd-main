  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Covoiturage } from '../Models/covoiturage';

  @Injectable({
    providedIn: 'root'
  })
  export class CovoiturageService {
    private baseUrl : String ="http://localhost:8082/Covoiturage";
    constructor(private httpClient : HttpClient) { }
    getListCovoiturage(): Observable<Covoiturage[]> 
    {
      return this.httpClient.get<Covoiturage[]>(this.baseUrl +'/retreiveCovoiturages')
        
    }
    addCovoiturage(covoiturage: Covoiturage,iduser:number ): Observable<Covoiturage> {
      const url = `${this.baseUrl}/AddCovoiturage/${iduser}`;
      return this.httpClient.post<Covoiturage>(url, covoiturage);
    }
    deleteCovoiturage(id_cov: any): Observable<any> {
      const url = `${this.baseUrl}/removeCovoiturage/${id_cov}`;
      return this.httpClient.delete(url);
    }
    retrieveCov(idCov: number): Observable<Covoiturage> {
      const url = `${this.baseUrl}/retreiveCov/${idCov}`;
      return this.httpClient.get<Covoiturage>(url);
    }
    updateNombrePlacecov(covId: number, newNombrePlacecov: number): Observable<any> {
      const url = `${this.baseUrl}/Covoiturage/${covId}/nombre_placecov`;
      return this.httpClient.put(url, { nombre_placecov: newNombrePlacecov });
    }
    sendSms(to: string, message: string): Observable<any> {
      const url = `${this.baseUrl}/SendSms?to=${to}&message=${message}`;
      return this.httpClient.get(url);
    }
    retrieveAllCovByUser(id: number): Observable<Covoiturage[]> {
      return this.httpClient.get<Covoiturage[]>(this.baseUrl +'/retrieveAllCovByUser/' + id);
    }
    retrieveCovByDest(destination:string): Observable<Covoiturage[]> {
      const url = `${this.baseUrl}/searchCovByDest/${destination}`;
      return this.httpClient.get<Covoiturage[]>(url);
    }
    ReserveCov(id_cov: number, idUser: number): Observable<any> {
      const url = `${this.baseUrl}/ReserveCov/${id_cov}/${idUser}`;
      return this.httpClient.post<any>(url, {});
    }
    updateCov(id_cov:number,updatedCov:Covoiturage): Observable<Covoiturage>
    { 
    return this.httpClient.put<Covoiturage>(`${this.baseUrl}/updateCovoiturage/${id_cov}`, updatedCov);

    }
  }

