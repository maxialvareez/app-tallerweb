import { Component, Input, OnInit } from '@angular/core';
import { IGrupo, IGasto } from '../../interfaces/interfaces';
import { GroupsService } from '../../services/groups.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.component.html',
  styleUrls: ['./lista-gastos.component.css']
})
export class ListaGastosComponent implements OnInit {
  
  @Input() grupo!: IGrupo;
  @Input() modoEdicion!: boolean;


  gastos : IGasto[] = [];
  
  constructor(private groupsService:GroupsService, private authService: AuthService ) { }
  

  ngOnInit(): void {
    this.groupsService.getGastos(this.grupo._id!).subscribe(gastos => this.gastos = gastos.gastos)
  }

  esCreador(idCreador:string):Boolean{
   if (this.authService.getUserId() == idCreador)
      return true;

    return false;
  }

  muestraEliminar():Boolean{

    return (this.modoEdicion && this.esCreador(this.grupo.creado_por!.uid!));
  }

  eliminarGasto(idGasto:string){
    this.groupsService.eliminarGasto(idGasto);
    window.location.reload();
  }

  marcarPago(gasto:IGasto){
    this.groupsService.marcarPago(gasto)
    window.location.reload();
  }
}


