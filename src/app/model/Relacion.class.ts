import { Plataforma } from "./Plataforma.class";
import { Serie } from "./Serie.class";
import { Usuario } from "./Usuario.class";

export class Relacion {

    constructor(public id_usuario: number,
                public id_serie: number,
                public temp_actual: number,
                public episod_actual: number,
                public activa: boolean,
                public plataforma: Plataforma) {}
}