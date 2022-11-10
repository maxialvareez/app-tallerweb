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
  
  

  constructor(private authService: AuthService, private groupsService: GroupsService) { }
  

  ngOnInit(): void { 
    


  }

  esCreador(idCreador:string):boolean{
   
    if (this.grupo.creado_por!.uid== idCreador){
            return true;
    }
       
   
 
     return false;
   }


  muestraEliminar(idUsuario:string):Boolean{
    
    
    
    return (this.modoEdicion && !this.esCreador(idUsuario!));
  }

  eliminarUsuarioGrupo(userId:string){
    this.groupsService.eliminarUsuarioGrupo(userId, this.grupo._id!)
    window.location.reload();

  }


}
