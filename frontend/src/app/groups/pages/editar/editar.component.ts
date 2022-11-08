import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../../services/groups.service';
import { IGrupo } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  grupo: IGrupo = {nombre: "", descripcion: ""};
  groupID!: string;


    miFormulario: FormGroup = this.fb.group({
    nombre: [ , [ Validators.required, Validators.minLength(3) ]   ],
    descripcion: [ , [ Validators.required, Validators.min(10)] ],
  })

  constructor( private fb: FormBuilder, private groupsService:GroupsService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    
    this.groupID = this.activatedRoute.snapshot.paramMap.get('id')!
    this.groupsService.getGrupoPorId(this.groupID!).subscribe(grupo => this.grupo =  grupo);
    
    this.grupo.nombre = "";
    this.grupo.descripcion = "";
   

    this.miFormulario.reset({
      nombre: this.grupo.nombre,
      descipcion: this.grupo.descripcion
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
    let nuevoGrupo : IGrupo = {nombre: this.miFormulario.controls["nombre"].value, descripcion: this.miFormulario.controls["descripcion"].value };
    //this.groupsService.agregarGrupo(nuevoGrupo).subscribe((res)=> console.log(res));
    //TODO editar turno
   
    this.miFormulario.reset();
  }

  resetear(){
    this.miFormulario.reset();
  }

  
}
