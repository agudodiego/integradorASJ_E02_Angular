import { Serie } from "./Serie.class";

export class Usuario {

    constructor (public id_usuario: number | null,
                public usuario: string,
                public contrasenia: string,
                public email: string | null,
                public usuarioSeries: Serie[] | null) {
    }
}