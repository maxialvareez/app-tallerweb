import { Component, Input, OnInit } from '@angular/core';
import { Igrupo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tarjeta-grupo',
  templateUrl: './tarjeta-grupo.component.html',
  styleUrls: ['./tarjeta-grupo.component.css']
})
export class TarjetaGrupoComponent  {

  @Input() grupo!: Igrupo;

}