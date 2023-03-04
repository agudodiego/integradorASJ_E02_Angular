import {Plataforma} from "./Plataforma.class";

export class Serie {

  constructor( public id_serie: number,
               public titulo: string,
               public temporadas: number,
               public episodios: number,
               public img_small: string,
               public img_big: string,
               public anio_lanzamiento: string,
               public sitio_oficial: string,
               public descripcion: string,
               public genero: string[],
               public plataforma: Plataforma,
               public activa: boolean,
               public temp_actual = 0,
               public episod_actual = 0
  )
  {  }
}
