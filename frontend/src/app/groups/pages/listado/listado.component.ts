import { Component, OnInit } from '@angular/core';
import { Igrupo } from '../../interfaces/interfaces';
import { GroupsService } from '../../services/groups.service';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  grupos : Igrupo[] = [];
  
  constructor(private GroupsService:GroupsService ) { }
  

  ngOnInit(): void {
    this.grupos = this.GroupsService.getGrupos()
   
  }

}
