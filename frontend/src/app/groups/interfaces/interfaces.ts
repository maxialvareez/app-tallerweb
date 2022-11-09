
export interface IGrupo {
    _id?:         string;
    nombre:      string;
    descripcion: string;
    estado?:      boolean;
    creado_por?:  IUsuario;
    integrantes?: IUsuario[];
    items?:       IGasto[];
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
    _id?:string;
    creado_por?: IUsuario;
    costo: number;
    nombre: string;
    estado?:boolean;
    descripcion: string;
    pago:boolean;

}

export interface GroupResponse {
    grupos: IGrupo[];
}

export interface GastosResponse {
    gastos: IGasto[];
}



