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

  grupo !: IGrupo;



  constructor(private activatedRoute: ActivatedRoute,
              private groupsService: GroupsService) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({id}) => this.grupo = this.groupsService.getGrupoPorId(id));
  }

}

