import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DogResponse {
  message: string;
  status: string;
}

export const baseUrl = 'https://dog.ceo/api/breeds/image/random';

@Injectable({
  providedIn: 'root'
})
export class DogsService {


  constructor(private http: HttpClient) { }
  
  get(): Observable<DogResponse> {
    return this.http.get<DogResponse>(baseUrl);
  }

}
