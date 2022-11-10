import { HttpBackend, HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGrupo, IGasto, IUsuario, GroupResponse, GastosResponse } from '../interfaces/interfaces';
import { Observable, throwError } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  grupos : IGrupo[] = [];


  constructor(private http: HttpClient) {
    
  }

  agregarGrupo(grupo:IGrupo):Observable<IGrupo>{

    return this.http.post<IGrupo>("/api/groupuser/", grupo)

  }


  getGrupos(){
    this.http.get<GroupResponse>("/api/groupuser/").subscribe((a) => this.grupos = a.grupos)

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



  //hacer
 getGastos(groupId:string):Observable<GastosResponse>
 {
  return this.http.get<GastosResponse>("/api/items/" + groupId);
 }

 agregarGasto(gasto:IGasto, idGrupo:string):Observable<IGasto>
 {
 
 return this.http.post<IGasto>("/api/items/"+idGrupo, gasto)
}

getUsuarios(groupId:string):Observable<IUsuario>
{
  return this.http.get<IUsuario>("/api/groupuser/");
}

agregarUsuario(groupId:string, correo:string)
{
  let json={
    grupo: groupId
  }
  console.log(groupId);
  return this.http.put<IUsuario>("/api/groupuser/user/" + correo, json).subscribe((e)=> {console.log(e ); this.getGrupos()});
}

editarGrupo(groupId:string, grupo:IGrupo )
{
  return this.http.put<IUsuario>("/api/groupuser/"+ groupId, grupo);
}

eliminarGrupo(groupId:string){
  
  this.http.delete("/api/groupuser/" + groupId).subscribe((e)=> {console.log(e); this.getGrupos() });
  
}

eliminarGasto(itemId:string){
  this.http.delete("/api/items/" + itemId).subscribe((e)=> console.log(e) );
}

marcarPago(item: IGasto){
  let json;
  if (item.pago == false){ 
    json = {
      pago:"true"
    }
}
else{
  json = {
    pago:"false"
  }
}
  
  return this.http.put<IGasto>("/api/items/"+ item._id, json ).subscribe((e)=> console.log(e));

}

eliminarUsuarioGrupo(userId:string, groupId:string){
  
  this.http.delete("/api/groupuser/" + groupId +"/"+ userId).subscribe((e)=> console.log(e));
}
}