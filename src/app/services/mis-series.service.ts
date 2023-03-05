import { Injectable } from '@angular/core';
import { Plataforma } from '../model/Plataforma.class';
import { Serie } from "../model/Serie.class";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MisSeriesService {

  private _misSeries: Serie[] = [];
  private _switchModal: boolean = false;
  private _serieConDetalle!: Serie;
  private _plataformas: Plataforma[] = [
    {
        "id_plataforma": 1,
        "plataforma": "Sin Plataforma",
        "url": ""
    },
    {
        "id_plataforma": 2,
        "plataforma": "cuevana",
        "url": "https://www4.cuevana3.ch/"
    },
    {
        "id_plataforma": 3,
        "plataforma": "pelispedia",
        "url": "https://pelispedia.one/"
    },
    {
        "id_plataforma": 4,
        "plataforma": "seriesw",
        "url": "https://mindandfist.com/"
    }
  ];

  private temporadas: number = 0;
  private episodios: number = 0;
  private anio: string = '';
  private descripcion: string = '';

  constructor(private apiService: ApiService) { }

  get misSeries(): Serie[] {
    return [...this._misSeries]; // spread operator
  }

  get plataformas(): Plataforma[] {
    return this._plataformas;
  }

  // ***************** SERIE DETALLADA ***********************

  habilitarDetalleSerie(serie: Serie) {
    this._serieConDetalle = serie;
  }

  get serieConDetalle() {
    return this._serieConDetalle;
  }

  // *********************** MODAL ***************************

  get switchModal(): boolean {
    return this._switchModal;
  }

  switchearModal(cambio: boolean) {
    this._switchModal = cambio;
  }

  // *********************** SERIES ***************************
  agregarSerie(serie: any) {

    //TODO validar si la serie ya existe (aca o en BD?)
    // valido que venga el año desde la API
    this.anio = this.validarAnio(serie.show.premiered);

    // valido el tamaño de la descripcion para que no sea muy largo
    this.descripcion = this.validarDescripcion(serie.show.summary);

    // consulto los episodios y temporadas de la serie en cuestion y armo el objeo serie
    this.consultarEpisodiosYTemporadas(serie);
  }

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

        this._misSeries.unshift(serieNueva);

        // console.log(this._misSeries)
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
