import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroment'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  searchMovies(query: string, page: number = 1, resultsPerPage: number = 5): Observable<any> {
    let params = new HttpParams()
      .set('s', query)
      .set('apikey', this.apiKey)
      .set('page', page.toString())
      .set('r', resultsPerPage.toString());

    return this.http.get(this.apiUrl, { params });
  }

  openDetails(detailID: string): Observable<any> {
    let params = new HttpParams()
      .set('i', detailID)
      .set('apikey', this.apiKey);
      
    return this.http.get(this.apiUrl, { params });
  }
}