import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../../services/groups.service';
import { IGrupo } from '../../interfaces/interfaces';
import { Usuario } from '../../../auth/interfaces/interfaces';
import { Router } from '@angular/router';

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

  constructor( private fb: FormBuilder, private groupsService:GroupsService, public router: Router ) { }

  ngOnInit() {
    this.miFormulario.reset({
    
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
    
    let nuevoGrupo : IGrupo = {nombre: this.miFormulario.controls["nombre"].value, descripcion: this.miFormulario.controls["descripcion"].value };
    this.groupsService.agregarGrupo(nuevoGrupo).subscribe((res)=> console.log(res));
    
   
    this.miFormulario.reset();
    
    
    this.router.navigate(['/groups/listado']);
  }

  resetear(){
    this.miFormulario.reset();
  }

}
