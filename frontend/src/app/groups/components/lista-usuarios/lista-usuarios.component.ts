import { Component, OnInit,Input } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { IGrupo, IUsuario } from '../../interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  @Input() grupo!: IGrupo;
  @Input() modoEdicion!: boolean;
  
  

  constructor(private authService: AuthService) { }
  

  ngOnInit(): void { 
    
    console.log("Valor grupo: " + this.grupo.nombre );

  }

  esCreador(idCreador:string):boolean{
   
    if (this.grupo.creado_por!.uid== idCreador){
      console.log("TRUE");
            return true;
    }
       
   
 
     return false;
   }


  muestraEliminar(idUsuario:string):boolean{
    console.log("Creador de grupo: " + this.grupo.creado_por!.uid);
    //console.log("Usuario actual: " + this.authService.getUserId());
    
    if (!this.modoEdicion){
      if (this.esCreador(idUsuario)){
        return false;
      }
    }
    
    return true;
  }
}
