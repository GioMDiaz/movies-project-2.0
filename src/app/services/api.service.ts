import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://www.omdbapi.com/';
  private apiKey = '71a5452b';

  constructor(private http: HttpClient) {}

  searchMovies(query: string, page: number = 1, resultsPerPage: number = 5): Observable<any> {
    const url = `${this.apiUrl}?s=${query}&apikey=${this.apiKey}&page=${page}&r=${resultsPerPage}`;
    return this.http.get(url);
  }

  openDetails(detailID: string): Observable<any> {
    const url = `${this.apiUrl}?i=${detailID}&apikey=${this.apiKey}`;
    return this.http.get(url);
  }

}