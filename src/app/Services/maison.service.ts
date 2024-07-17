import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maison } from '../Models/maison';
import { User } from '../Models/user';

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
@Injectable({
  providedIn: 'root'
})


export class MaisonService {

  private baseUrl : string = 'http://172.213.199.57:8082/maison';

  constructor(private http: HttpClient) { }
  findAllMaisons(): Observable<Maison[]>{
    return this.http.get<Maison[]>(this.baseUrl + '/list');
  }

  addMaison(maison : Maison): Observable<Maison>{
    return this.http.post<Maison>(this.baseUrl + '/addMaison',maison);
  }
  addMaisonByUser(maison: Maison, id: number): Observable<Maison> {
    return this.http.post<Maison>(`${this.baseUrl}/addMaisonbyuser?id=${id}`, maison);
  }
  
  updateMaison(maison: Maison): Observable<Maison> {
    console.log("maison : ",maison)
    return this.http.put<Maison>(`${this.baseUrl}/updateMaison/${maison.id_maison}`, maison);
  }

  getMaisonById(maison_id: number): Observable<Maison> {
    return this.http.get<Maison>(`${this.baseUrl}/getMaison/${maison_id}`);
  }
  deleteMaison(maison_id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteMaison/${maison_id}`);   
  }
  getMaisonsByUtilisateur(id: number): Observable<Maison[]> {
    return this.http.get<Maison[]>(`${this.baseUrl}/utilisateurs/${id}/maisons`);
  }

  /*ajouterDemandeur(maisonId: number, demandeur: User): Observable<Maison> {
    return this.http.post<Maison>(`${this.baseUrl}/${maisonId}/demandeur`, demandeur);
  }*/
    ajouterDemandeur(maisonId: number, demandeurId: number): Observable<Maison> {
      const url = `${this.baseUrl}/${maisonId}/demandeur/${demandeurId}`;
      return this.http.post<Maison>(url, {}, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
    }
  supprimerDemandeur(maisonId: number, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${maisonId}/demandeurs/${id}`);
  }

  findAllMaisonsPage(pageNumber: number, pageSize: number): Observable<Page<Maison>> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString());

    return this.http.get<Page<Maison>>(`${this.baseUrl}/list_page`, { params });
  }
  chercherMaison(adresse: string): Observable<Maison[]> {
    return this.http.get<Maison[]>(`${this.baseUrl}/search/${adresse}`); 
  }
  

  
}



























 /* updateUser(user : User): Observable<User>{
    return this.http.put<User>(this.baseUrl + '/updateUser',user);
  }
  saveUsers(users: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/save`, users);
  }
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/retrieveOneUser/${userId}`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/removeUser/${userId}`);
  }


  //malekkk
  getProjectManagers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/projectmanagers');
  }
  // malekkk
  getEmployeesForTASKS(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/employees');
  }
// malekk
getCompetentUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/competentUsers`);
}

private baseUrlf : string = 'http://localhost:8082/user';

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrlf}/files/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrlf}/files`);
  }
  getFile(filename: string): Observable<HttpResponse<Blob>> {
    const url = `${this.baseUrlf}/files/${filename}`;
    return this.http.get(url, {
      responseType: 'blob',
      observe: 'response' // To access full response including headers
    });
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/email/${email}`);
  }*/

