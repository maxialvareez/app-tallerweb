import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { MenuComponent } from './pages/menu/menu.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { GrupoComponent } from './pages/grupo/grupo.component';
import { MainComponent } from '../auth/pages/main/main.component';
import { EditarComponent } from './pages/editar/editar.component';


const routes: Routes = [
  
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: 'agregar', component: AgregarComponent},
      { path: 'listado', component: ListadoComponent},
      { path: ':id', component: GrupoComponent},
      { path: 'editar/:id', component: EditarComponent},
      { path: 'buscar', component: BuscarComponent},
      { path: '**', redirectTo: 'listado'}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class GroupsRoutingModule { }
