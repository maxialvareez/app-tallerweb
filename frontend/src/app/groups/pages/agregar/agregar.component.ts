import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../../services/groups.service';
import { Igrupo } from '../../interfaces/interfaces';
import { Usuario } from '../../../auth/interfaces/interfaces';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ , [ Validators.required, Validators.minLength(3) ]   ],
    descripcion: [ , [ Validators.required, Validators.min(10)] ],
  })

  constructor( private fb: FormBuilder, private groupsService:GroupsService ) { }

  ngOnInit() {
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
    this.groupsService.usuario
    let nuevoGrupo : Igrupo = {titulo: this.miFormulario.controls["nombre"].value, descripcion: this.miFormulario.controls["descripcion"].value, estado:false, creador:this.groupsService.usuarioActual };
    this.groupsService.agregarGrupo(nuevoGrupo);

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

  resetear(){
    this.miFormulario.reset();
  }

}
