import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Igrupo, IGasto, IUsuario } from '../interfaces/interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  grupos : Igrupo[] = [];
  idActual: number = 0;
  usuario: any = localStorage.getItem('token');
  usuarioActual : IUsuario = {nombre:"Jose"};

  constructor(private http: HttpClient) {
    
  }

  agregarGrupo(grupo :Igrupo){
    this.idActual++;
    grupo.id = this.idActual;
    this.grupos.push(grupo);
  }

  getGrupos(): Observable<Igrupo[]>{
    return this.http.get<Igrupo[]>("/api/groupuser")
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
