import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BadWordService {
  private readonly API_KEY = '441a525190mshdee5af2c4e9be5dp1b3830jsn1d1b21108fec';
  constructor() { }

  checkForBadWord(content: string): Observable<any> {
    const encodedParams = new URLSearchParams();
    encodedParams.set('content', content);
   

    const options = {
      method: 'POST',
      url: 'https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': this.API_KEY,
        'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
      },
      data: encodedParams
    };

    return new Observable((observer) => {
      axios.request(options)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }}