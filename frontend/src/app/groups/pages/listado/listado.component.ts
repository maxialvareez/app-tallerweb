import { Component, OnInit } from '@angular/core';
import { IGrupo, GroupResponse } from '../../interfaces/interfaces';
import { GroupsService } from '../../services/groups.service';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  grupos : IGrupo[] = []
  
  constructor(public groupsService:GroupsService, private authService: AuthService ) { 
    
  }
  

  ngOnInit(): void {
    this.groupsService.getGrupos();
    this.grupos = this.groupsService.grupos;

  }

  esCreador(idCreador:string):Boolean{
   if (this.authService.getUserId() == idCreador)
      return true;

    return false;
  }

  eliminarGrupo(groupId:string){
    this.groupsService.eliminarGrupo(groupId);
    this.groupsService.getGrupos();
  }
}
