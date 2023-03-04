import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }

  getResultadosBusqueda (terminoBusqueda: string) {
    return this.http.get('https://api.tvmaze.com/search/shows?q='+terminoBusqueda);
  }

  getEpisodiosYTemporadas (idSerie: number) {
    return this.http.get(`https://api.tvmaze.com/shows/${idSerie}/seasons`);
  }

}
