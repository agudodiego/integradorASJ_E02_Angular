import {Plataforma} from "./Plataforma.class";

export class Serie {

  constructor(id_serie: number,
              titulo: string,
              temporadas: number,
              episodios: number,
              img_small: string,
              img_big: string,
              anio_lanzamiento: string,
              sitio_oficial: string,
              descripcion: string,
              genero: string[],
              plataforma: Plataforma,
              activa: boolean,
              temp_actual = 0,
              episod_actual = 0)
  {  }
}
