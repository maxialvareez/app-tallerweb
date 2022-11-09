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
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { EditarComponent } from './pages/editar/editar.component';
import { TabListsComponent } from './components/tab-lists/tab-lists.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { AgregarGastoComponent } from './pages/agregar-gasto/agregar-gasto.component';
import { AgregarUsuarioComponent } from './pages/agregar-usuario/agregar-usuario.component';


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
    ListaUsuariosComponent,
    EditarComponent,
    TabListsComponent,
    AgregarGastoComponent,
    AgregarUsuarioComponent,

    
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GroupsRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule
  ]
})
export class GroupsModule { }
