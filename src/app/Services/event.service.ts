import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../Models/statistiv/event';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl : String ="http://localhost:8082/Evenement";
  constructor(private httpClient : HttpClient) {}

  getApprovedListEvents(): Observable<Event[]> 
  {
    return this.httpClient.get<Event[]>(`${this.baseUrl}/approvedEvents`)
      
  }
  
 // Méthode pour envoyer les données du formulaire au serveur
 addEvent(event: Event, id:number): Observable<any> {
  return this.httpClient.post<any>(`${this.baseUrl}/addEvent/${id}`, event);
}
getEventById(idEvent: number): Observable<Event> {
  return this.httpClient.get<Event>(`${this.baseUrl}/getById/${idEvent}`);
}
getQRCodeUrl(idEvent: number): Observable<string> {
  return this.httpClient.get(`${this.baseUrl}/qrCode/${idEvent}`, { responseType: 'blob' })
    .pipe(
      map((blob: Blob) => URL.createObjectURL(blob))
    );
}

getAllEvents(): Observable<Event[]> 
{
  return this.httpClient.get<Event[]>(this.baseUrl +'/EventController')
}
approveEvent(idEvent: number): Observable<Event> {
  return this.httpClient.put<Event>(`${this.baseUrl}/approveEvent/${idEvent}`, {});
}
rejectEvent(idEvent: number): Observable<Event> {
  return this.httpClient.put<Event>(`${this.baseUrl}/rejectEvent/${idEvent}`, {});
}

getEventsByUser(id: number): Observable<Event[]> {
  return this.httpClient.get<Event[]>(`${this.baseUrl}/getEventsUser/${id}`);
}
updateEvent(idEvent: number, updatedEvent: Event): Observable<Event> {
  return this.httpClient.put<Event>(`${this.baseUrl}/updateEvent/${idEvent}`, updatedEvent);
}
deleteEvent(idEvent: number): Observable<Event> {
  return this.httpClient.delete<Event>(`${this.baseUrl}/DeleteById/${idEvent}`, {});
}
searchEventsByOrganisateur(organisateurEvent: string): Observable<Event[]> {
  return this.httpClient.get<Event[]>(`${this.baseUrl}/searchEventsByOrganisateur/${organisateurEvent}`);
}
findAllOrderByPriceDesc(): Observable<Event[]> {
  return this.httpClient.get<Event[]>(`${this.baseUrl}/orderByPriceDesc`);
}
findByDateDebutEvent(date: String): Observable<Event[]> {
  return this.httpClient.get<Event[]>(`${this.baseUrl}/findByDateDebutEvent/${date}`);
}
}
