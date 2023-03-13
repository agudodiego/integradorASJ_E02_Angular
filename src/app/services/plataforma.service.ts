import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { Plataforma } from '../model/Plataforma.class';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  private handlerException(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Error del front ' + error.error.message);
    } else {
      console.log('Error del back ' + error.error.message);      
    }
    return throwError('Error de comunicacion');
  }

  constructor(private http: HttpClient) { }

  traerPlataformas() {
    const url: string = 'http://localhost:8080/API/V1/plataformas';
    return this.http.get<Observable<Plataforma[]>>(url)
                .pipe(catchError(this.handlerException));
  }
}
