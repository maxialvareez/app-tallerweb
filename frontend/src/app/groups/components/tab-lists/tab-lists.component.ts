import { Component, OnInit,Input } from '@angular/core';
import { IGrupo } from '../../interfaces/interfaces';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-tab-lists',
  templateUrl: './tab-lists.component.html',
  styleUrls: ['./tab-lists.component.css']
})
export class TabListsComponent implements OnInit {

  @Input() grupo!: IGrupo;
  modoEdicion:boolean = false;
  
  constructor(private authService: AuthService) { 

  }

  ngOnInit(): void {


    
  }

  toEditMode(){
    if (this.modoEdicion == true)
    {
      this.modoEdicion = false;
    }
    else this.modoEdicion = true;
  }

  esCreador():Boolean{
    if (this.authService.getUserId() == this.grupo.creado_por!.uid)
       return true;
 
     return false;
   }
 
}
