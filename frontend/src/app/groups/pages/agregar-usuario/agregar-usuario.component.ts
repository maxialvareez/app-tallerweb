import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGasto } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre: [ , [ Validators.required, Validators.minLength(3) ]   ]
  })

 groupId:string = "";

  constructor( private fb: FormBuilder, private groupsService:GroupsService,  private activatedRoute: ActivatedRoute, private location: Location ) { }

  ngOnInit() {
    
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id')!
    this.miFormulario.reset({
      // nombre: 'RTX 4080ti',
    
    })
  }


  campoEsValido( campo: string ) {

    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  guardar() {

    if ( this.miFormulario.invalid )  {
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.groupsService.agregarUsuario(this.groupId, this.miFormulario.controls["nombre"].value)
  
   
    this.miFormulario.reset();
    this.goBack();
  }

  resetear(){
    this.miFormulario.reset();
  }
  
  goBack(): void {
    this.location.back();
  }
}
