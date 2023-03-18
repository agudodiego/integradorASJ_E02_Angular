import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plataforma } from '../model/Plataforma.class';
import { Serie } from "../model/Serie.class";
import { ApiService } from './api.service';
import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MisSeriesService {

  url = 'http://localhost:8080/API/V1/series';

  private temporadas: number = 0;
  private episodios: number = 0;
  private anio: string = '';
  private descripcion: string = '';

  private httpOptions() {
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
  }

  constructor(private apiService: ApiService,
    private usuarioService: UsuarioService,
    private http: HttpClient) { }

  // *********************** SERIES ***************************
  agregarSerie(serie: any) {

    // valido que venga el año desde la API
    this.anio = this.validarAnio(serie.show.premiered);

    // valido el tamaño de la descripcion para que no sea muy largo
    this.descripcion = this.validarDescripcion(serie.show.summary);

    // consulto los episodios y temporadas de la serie en cuestion y armo el objeo serie
    this.consultarEpisodiosYTemporadas(serie);

  };

  private validarAnio(anio: string): string {
    if (anio) {
      return anio.substring(0, 4);
    }
    return '';
  }

  private validarDescripcion(descripcion: string): string {
    if (descripcion) {
      return this.cortarDescripcion(descripcion);
    }
    return '';
  }

  private cortarDescripcion(descripcion: string): string {

    if (descripcion != 'null' && descripcion.length > 254) {
      let stringAux: string = descripcion.substring(0, 249);
      let indiceUltimoPunto: number = stringAux.lastIndexOf('.');
      if (indiceUltimoPunto == -1) return '';
      return `${descripcion.substring(0, indiceUltimoPunto)}.</p>`;
    }
    return descripcion;
  }

  private consultarEpisodiosYTemporadas(serie: any) {

    this.apiService.getEpisodiosYTemporadas(serie.show.id)
      .subscribe((resul: any) => {
        // cuento los elementos del array que equivale a la cantidad de temporadas
        this.temporadas = resul.length;

        // itero dentro de cada temporada contando los episodios
        this.episodios = resul.reduce((total: number, episodios: any) => {
          return total + episodios.episodeOrder;
        }, 0);

        let serieNueva = this.armarSerie(serie);

        const nombreUsuario = this.usuarioService.usuarioLogeado.usuario;
        this.http.post(`${this.url}/${nombreUsuario}`, serieNueva, this.httpOptions())
          .subscribe({
            next: (resp: any) => {
              // agrega la lista en el array que esta en local asi evito hacer un GET+
              this.usuarioService.agregarSerieALista(resp);

              Swal.fire({
                position: 'top',
                title: 'Serie agregada!!',
                showConfirmButton: false,
                timer: 1500,
                background: '#686868dd',
                color: '#FF4C29'
              })
            },
            error: (err) => {
              console.log(err);
            }
          });
      })
  }

  private armarSerie(serie: any): Serie {

    // genero una plataforma "vacia" para inicializar el objeto serie
    let plataforma: Plataforma = new Plataforma(
      1,
      'Sin Plataforma',
      null
    );

    return new Serie(
      serie.show.id,
      serie.show.name,
      this.temporadas,
      this.episodios,
      serie.show.image?.medium,
      serie.show.image?.original,
      this.anio,
      serie.show?.officialSite,
      this.descripcion,
      serie.show.genres,
      plataforma,
      true,
      0,
      0
    );
  }


}
