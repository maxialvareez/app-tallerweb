
export interface IGrupo {
    _id?:         string;
    nombre:      string;
    descripcion: string;
    estado?:      boolean;
    creado_por?:  IUsuario;
    integrantes?: IUsuario[];
    items?:       any[];
    __v?:    number;

}

export interface IUsuario{
    nombre: string;
    uid?: string;
    correo?: string;
    password?: string;
    imagen?: string;
    estado?:boolean;
    rol?: string;
}


export interface IGasto{
    usuario: IUsuario;
    cantidad: number;
    nombre: string;
    estado?:boolean;
    descripcion: string;

}

export interface GroupResponse {
    total:  number;
    grupos: IGrupo[];
}




