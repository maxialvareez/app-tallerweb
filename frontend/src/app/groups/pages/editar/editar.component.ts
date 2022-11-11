import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../../services/groups.service';
import { IGrupo } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  grupo: IGrupo = {nombre: "", descripcion: ""};
  groupID!: string;


    miFormulario: FormGroup = this.fb.group({
    nombre: [ , [ Validators.minLength(3) ]   ],
    descripcion: [ , [ , Validators.minLength(3)] ],
  })

  constructor( private fb: FormBuilder, private groupsService:GroupsService, private activatedRoute: ActivatedRoute, private location: Location ) { }

  async ngOnInit() {
    
    this.groupID = this.activatedRoute.snapshot.paramMap.get('id')!
    this.groupsService.getGrupoPorId(this.groupID!).subscribe(grupo => {this.grupo =  grupo; this.resetInicial});

    
  

    
    

   
  }
  resetInicial(){
    this.miFormulario.reset({
      nombre: this.grupo.nombre,
      descripcion: this.grupo.descripcion
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
    
    if (this.miFormulario.controls["nombre"].value == null){
      this.miFormulario.get("nombre")?.setValue(this.grupo.nombre);
    }

    if (this.miFormulario.controls["descripcion"].value == null){
      this.miFormulario.get("descripcion")?.setValue(this.grupo.descripcion);
    }
    let nuevoGrupo : IGrupo = {nombre: this.miFormulario.controls["nombre"].value, descripcion: this.miFormulario.controls["descripcion"].value };
    console.log(nuevoGrupo);
    this.groupsService.editarGrupo(this.groupID,nuevoGrupo);
    
   
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
