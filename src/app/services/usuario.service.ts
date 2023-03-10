import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Serie } from '../model/Serie.class';
import { Usuario } from '../model/Usuario.class';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  url = 'http://localhost:8080/API/V1';
  private _usuarioLogeado!: Usuario;
  private _serieConDetalle!: Serie;
  private handlerException(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Error del front ' + error.error.message);
    } else {
      console.log('Error del back ' + error.error.message);      
    }
    return throwError('Error de comunicacion');
  }

  constructor(private http: HttpClient) { }

  get usuarioLogeado(): Usuario {
    return this._usuarioLogeado; // atento por si necesito spread operator
  }

  setearUsuarioLogeado(usuario: Usuario) {
    this._usuarioLogeado = usuario;
  }

  agregarSerieALista(serie: Serie) {
    this._usuarioLogeado.usuarioSeries!.unshift(serie);
  }

  get seriesDelUsuario(): Serie[] {
    return this._usuarioLogeado.usuarioSeries!;
  }

// SERIE DETALLADA ***********************

  habilitarDetalleSerie(serie: Serie) {
    this._serieConDetalle = serie;
  }

  get serieConDetalle() {
    return this._serieConDetalle;
  }

  // PETICIONES **************************

  private httpOptions(){
    return {
      headers : new HttpHeaders({
        'content-type':'application/json'
      })
    };
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/usuarios`, usuario, this.httpOptions())
            .pipe(catchError(this.handlerException));
  }

  logearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/usuarios/${usuario.usuario}`, usuario, this.httpOptions())
            .pipe(catchError(this.handlerException));
  }

  actualizarRelacion(relacion: Object) {
    return this.http.post(`${this.url}/relaciones`, relacion, this.httpOptions())
            .pipe(catchError(this.handlerException));
  }
}
