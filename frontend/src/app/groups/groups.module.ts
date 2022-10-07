import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { GroupsRoutingModule } from './groups-routing.module';

import { CommonModule } from '@angular/common';
import { MenuComponent } from './pages/menu/menu.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { GrupoComponent } from './pages/grupo/grupo.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TarjetaGrupoComponent } from './components/tarjeta-grupo/tarjeta-grupo.component';
import { ListaGastosComponent } from './components/lista-gastos/lista-gastos.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    MenuComponent,
    AgregarComponent, 
    ListadoComponent,
    BuscarComponent,
    GrupoComponent,
    TarjetaGrupoComponent,
    ListaGastosComponent,
    ConfirmationDialogComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GroupsRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class GroupsModule { }
