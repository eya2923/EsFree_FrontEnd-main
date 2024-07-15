import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Raba3 } from '../Models/raba3';
import { Jeux } from '../Models/Jeux';

@Injectable({
  providedIn: 'root'
})
export class Raba3Service {
  private baseUrl:string= "http://172.213.197.32:8082/SessionJeux";
  private fcmUrl = 'https://fcm.googleapis.com/fcm/send';
  private serverKey = 'AAAAVhaWNgw:APA91bFggg2WnoXuzUZP5SyCgYF3G8xi4j455wRoz5-rPOulMWDTonUiJAMsnyvDHFAJlyt376rm59HBbudITMBtMYm7_OWec8gf2lXnbbuRBHRxscA53XB7MJN_NiZp3mmOolQbrjzF';

  constructor(private httpClient : HttpClient) { }

  getListSessions2(): Observable<Raba3[]> 
  {
    return this.httpClient.get<Raba3[]>(this.baseUrl +'/retrieveAllGameSessions2')
      
  }
  getListSessions(idJeux: number): Observable<Raba3[]> {
    return this.httpClient.get<Raba3[]>(`${this.baseUrl}/retrieveAllGameSessions/${idJeux}`);
  }
  addGameSession(raba3: Raba3): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/addGameSession`, raba3);
  }

  retrieveUserGameSession(name: String): Observable<Raba3[]> {
    return this.httpClient.get<Raba3[]>(`${this.baseUrl}/retrieveUserGameSession/${name}`);
  }

  deleteGameSession(idRaba3: number): Observable<Raba3> {
    return this.httpClient.delete<Raba3>(`${this.baseUrl}/removeGameSession/${idRaba3}`);
  }

  updateGameSession(idRaba3: number, updatedraba3: Raba3): Observable<Raba3>{
    return this.httpClient.put<Raba3>(`${this.baseUrl}/updateGameSession/${idRaba3}`,updatedraba3);

  }

  addGameSessionAndAssignToGame(raba3: Raba3, idJeux: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/addGameSessionAndAssignToGame/${idJeux}`, raba3);
  }

  retrieveGameSession(idRaba3: number): Observable<Raba3> {
    return this.httpClient.get<Raba3>(`${this.baseUrl}/retrieveGameSession/${idRaba3}`);
  }

  retieveGameSessionSpecificUser(idRaba3: number, name: string): Observable<Raba3> {

    return this.httpClient.get<Raba3>(`${this.baseUrl}/retieveGameSessionSpecificUser/${idRaba3},${name}`);
  }

  addGameSessionAndAssignToGameAndUser(raba3: Raba3, idJeux: number, id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/addGameSessionAndAssignToGameAndUser/${idJeux}/${id}`, raba3);
  }

  addUserToSession(idRaba3: number, id:number): Observable<void> {
    //const id = 1; // Static user ID

    return this.httpClient.post<void>(`${this.baseUrl}/addUserToSession/${idRaba3}/${id}`, {});
  }

  removeUserFromSession(idRaba3: number, id:number): Observable<Raba3> {
    //const id = 1; // Static user ID

    return this.httpClient.delete<Raba3>(`${this.baseUrl}/removeUserFromSession/${idRaba3}/${id}`);
  }
  
  sendNotification(notificationData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'key=' + this.serverKey
    });

    return this.httpClient.post<any>(this.fcmUrl, notificationData, { headers });
  }
  

}