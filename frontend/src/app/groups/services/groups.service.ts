import { HttpBackend, HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGrupo, IGasto, IUsuario, GroupResponse } from '../interfaces/interfaces';
import { Observable, throwError } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  grupos : IGrupo[] = [];
  usuario: any = localStorage.getItem('token');
  usuarioActual : IUsuario = {nombre:"Jose"};

  constructor(private http: HttpClient) {
    
  }

  agregarGrupo(grupo:IGrupo):Observable<IGrupo>{
    
    return this.http.post<IGrupo>("/api/groupuser/", grupo)

  }


  getGrupos(): Observable<GroupResponse>{
    return this.http.get<GroupResponse>("/api/groupuser/");
    }
  

  getGrupoPorId(id:string):Observable<IGrupo>{
    return this.http.get<IGrupo>(`/api/groupuser/${ id }`);
    
    
  }
  
  
  
  getFormulariosPorNombre(titulo:string):IGrupo[]{
    let grupos : IGrupo[] = [];
    for (var f=0; f<this.grupos.length; f++){
      if (this.grupos[f].nombre == titulo)
          grupos.push(this.grupos[f]);
    }

    return grupos;
  }

 
}
