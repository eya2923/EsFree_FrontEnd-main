import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }
  getCoordinates(lieu_depart: string): Promise<{latitude: number, longitude: number}> {
    const location = `${lieu_depart}, Tunisia`; // Constructing the location string with lieu_depart
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    
    return this.http.get(url)
      .toPromise()
      .then((response: any) => {
        if (Array.isArray(response) && response.length > 0) {
          return {
            latitude: parseFloat(response[0].lat),
            longitude: parseFloat(response[0].lon)
          };
        } else {
          return Promise.reject('Location not found');
        }
      })
      .catch(error => {
        console.error('Error fetching coordinates:', error);
        return Promise.reject('Error fetching coordinates');
      });
  }
}
