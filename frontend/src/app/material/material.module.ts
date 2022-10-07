import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon'; 
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  exports:[
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule, 
    MatButtonModule,
    MatCardModule, 
    MatDialogModule
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
