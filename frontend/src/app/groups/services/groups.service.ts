import { Injectable } from '@angular/core';
import { Igrupo, IGasto, IUsuario } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  grupos : Igrupo[] = [];
  idActual: number = 0;
  usuario: any = localStorage.getItem('token');
  usuarioActual : IUsuario = {nombre:"Jose"};

  constructor() {

    let usuario1: IUsuario = {nombre: "Juan" };
    let usuario2: IUsuario = {nombre: "Pedro" };
    let usuarios: IUsuario[] = [usuario1,usuario2];

    let gasto1: IGasto = {nombre: "Compra super", cantidad :50, descripcion: "Compra de comida en el supermercado blablabla", usuario: usuario1, estado: false };
    let gasto2: IGasto = {nombre: "2Compra super", cantidad :50, descripcion: "2Compra de comida en el supermercado blablabla", usuario: usuario1, estado: false };
    let gasto3: IGasto = {nombre: "3Compra super", cantidad :50, descripcion: "3Compra de comida en el supermercado blablabla", usuario: usuario2, estado: false };
    let gastos: IGasto[] = [gasto1,gasto2,gasto3];

    let grupo1: Igrupo ={creador: usuario1, descripcion:"grupo de gastos 1", estado: false, titulo:"grupo 1", usuarios, gastos, id: 1};
    let grupo2: Igrupo ={creador: usuario2, descripcion:"grupo de gastos 2knsdoansonfoawsnfoisanfosnfoasfsaofnoasfna", estado: false, titulo:"grupo 2", usuarios, gastos, id: 2}

    this.agregarGrupo(grupo1);
    this.agregarGrupo(grupo2);
    grupo1.creador?.nombre
  }

  agregarGrupo(grupo :Igrupo){
    this.idActual++;
    grupo.id = this.idActual;
    this.grupos.push(grupo);
  }

  getGrupos(): Igrupo[]{
    console.log(this.usuario)
    return this.grupos;
  }

  getGrupoPorId(id:number):Igrupo{
    for (var f=0; f<this.grupos.length; f++){
      if (this.grupos[f].id == id)
          return this.grupos[f];
    }
    let usuario: IUsuario = {nombre: "Juan" };
    let survey: Igrupo = {descripcion:"grupo de gastos 2", estado: false, titulo:"grupo 2", id: 0, creador: usuario};
    return survey;
  }

  
  
  
  getFormulariosPorNombre(titulo:string):Igrupo[]{
    let grupos : Igrupo[] = [];
    for (var f=0; f<this.grupos.length; f++){
      if (this.grupos[f].titulo == titulo)
          grupos.push(this.grupos[f]);
    }

    return grupos;
  }
}
