import { Component, Input, OnInit } from '@angular/core';
import { IGrupo } from '../../interfaces/interfaces';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-tarjeta-grupo',
  templateUrl: './tarjeta-grupo.component.html',
  styleUrls: ['./tarjeta-grupo.component.css']
})
export class TarjetaGrupoComponent  {

  @Input() grupo!: IGrupo;

  constructor(private authService:AuthService){}
  
  esCreador():Boolean{
    if (this.authService.getUserId() == this.grupo.creado_por!.uid)
       return true;
 
     return false;
   }
   cantidadIntegrantes():string{
    if (this.grupo.integrantes != null){
      return this.grupo.integrantes.length.toString();
    }
    return "0";
   }

   cantidadGastos():string{
   
    if (this.grupo.items != null){
      return this.grupo.items!.length.toString();
    }
    return "0";
   }
}

