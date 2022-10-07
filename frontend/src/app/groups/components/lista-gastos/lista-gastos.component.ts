import { Component, Input, OnInit } from '@angular/core';
import { Igrupo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.component.html',
  styleUrls: ['./lista-gastos.component.css']
})
export class ListaGastosComponent implements OnInit {
  
  @Input() grupo!: Igrupo;
  


  constructor() { }

  ngOnInit(): void {
  }

}