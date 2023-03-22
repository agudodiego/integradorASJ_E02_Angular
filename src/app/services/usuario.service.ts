import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Relacion } from '../model/Relacion.class';
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
    return this._usuarioLogeado;
  }

  setearUsuarioLogeado(usuario: Usuario) {
    this._usuarioLogeado = usuario;
  }

  agregarSerieALista(serie: Serie) {
    this._usuarioLogeado.usuarioSeries!.unshift(serie);
  }

  borrarSerieEnLista(relacion: any) {
    let resultado = this._usuarioLogeado.usuarioSeries!.filter((serie) => serie.id_serie != relacion.id_serie);
    this._usuarioLogeado.usuarioSeries = resultado;
  }

  modificarSerieEnLista(relacion: any) {
    this._usuarioLogeado.usuarioSeries!.forEach(( s => {
      if (s.id_serie == relacion.id_serie) {
        s.id_serie = relacion.id_serie,
        s.temp_actual = relacion.temp_actual,
        s.episod_actual = relacion.episod_actual,
        s.activa = relacion.activa,
        s.plataforma = relacion.plataforma
      }
    }))
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
    return this.http.put(`${this.url}/relaciones`, relacion, this.httpOptions())
            .pipe(catchError(this.handlerException));
  }

  cambiarContrasenia(datosNuevos: any) {
    return this.http.put(`${this.url}/usuarios/${datosNuevos.usuario}`, datosNuevos, this.httpOptions())
            .pipe(catchError(this.handlerException));
  }
}
