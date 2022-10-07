export interface Igrupo{
    id?:number;
    titulo: string;
    descripcion:string;
    gastos?: IGasto[];
    estado: boolean;
    creador: IUsuario;
    usuarios? :IUsuario[];
}


export interface IUsuario{
    nombre: string;
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