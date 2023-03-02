import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  // public arraySeriesBucadas: any[] = [];
  urlSeries = 'https://api.tvmaze.com/search/shows?q=';
  constructor( private http: HttpClient) { }
  getResultadosBusqueda (terminoBusqueda: string) {
    return this.http.get(this.urlSeries+terminoBusqueda);
  }

}
