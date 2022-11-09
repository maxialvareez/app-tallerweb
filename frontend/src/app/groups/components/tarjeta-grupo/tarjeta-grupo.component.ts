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

}

