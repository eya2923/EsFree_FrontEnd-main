import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jeux, TypeJeux } from '../Models/Jeux';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class GameService {
  private baseUrl: String= "http://172.213.199.57:8082/Jeux";

  constructor(private httpClient : HttpClient) { }
  
  getListGames(): Observable<Jeux[]> 
  {
    return this.httpClient.get<Jeux[]>(this.baseUrl +'/retrieveAllGames')  
  }

  addGame(jeux: Jeux): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/addGame`, jeux);
  }

  retrieveGame(idJeux: number): Observable<Jeux> {
    return this.httpClient.get<Jeux>(`${this.baseUrl}/retrieveGame/${idJeux}`);
  }
  
  updateGame(jeux : Jeux,): Observable<Jeux>{
    return this.httpClient.put<Jeux>(`${this.baseUrl}/updateGame/${jeux.idJeux}`, jeux);

  }

  updateGame2(idJeux: number, updatedGame: any): Observable<Jeux> {
    return this.httpClient.put<Jeux>(`${this.baseUrl}/updateGame/${idJeux}`, updatedGame);
  }
  
  editGame2(idJeux: number, updatedGame: Jeux): Observable<Jeux> {
    return this.httpClient.put<Jeux>(`${this.baseUrl}/updateGame/${idJeux}`, updatedGame);
  }
  deleteGame(idJeux: number): Observable<Jeux> {
    return this.httpClient.delete<Jeux>(`${this.baseUrl}/removeGame/${idJeux}`);
  }

  retrieveGameByType(typeJeux: string): Observable<Jeux[]> {
    return this.httpClient.get<Jeux[]>(`${this.baseUrl}/retrieveGameByType/${typeJeux}`);
  }

}
