import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participation } from '../Models/participation/participation.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private baseUrl : String ="http://localhost:8082/Participation";
  constructor(private httpClient : HttpClient) {}

  addParticipation(participation: Participation, idEvent:number, id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/addParticipation/${idEvent}/${id}`,participation);
  }
  getParticipationsByUser(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/getParticipationsUser/${id}`);
  }
  retrieveAllParticipations(): Observable<Participation[]> {
    return this.httpClient.get<Participation[]>(`${this.baseUrl}/ParticipationController`);
  }
  updateParticipation(idParticipation: number, updatedParticipation: Participation): Observable<Participation> {
    return this.httpClient.put<Participation>(`${this.baseUrl}/updateParticipation/${idParticipation}`, updatedParticipation);
  }
  deleteParticipation(idParticipation: number): Observable<Participation> {
    return this.httpClient.delete<Participation>(`${this.baseUrl}/DeleteById/${idParticipation}`, {});
  }
  getQRCodeUrlPart(idParticipation: number): Observable<string> {
    return this.httpClient.get(`${this.baseUrl}/qrCode/participation/${idParticipation}`, { responseType: 'blob' })
      .pipe(
        map((blob: Blob) => URL.createObjectURL(blob))
      );
  }
  getParticipationStatistics(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/statistics`);
  }
  
}
