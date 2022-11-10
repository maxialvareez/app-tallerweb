import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGrupo } from '../../interfaces/interfaces';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  grupo: IGrupo = {nombre: "", descripcion: ""};
  groupID!: string;



  constructor( private groupsService: GroupsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.groupID = this.activatedRoute.snapshot.paramMap.get('id')!
    
    this.groupsService.getGrupoPorId(this.groupID!).subscribe(grupo => this.grupo =  grupo);
  }

}

