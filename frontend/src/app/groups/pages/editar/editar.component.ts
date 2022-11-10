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
    nombre: [ , [ Validators.required, Validators.minLength(3) ]   ],
    descripcion: [ , [ Validators.required, Validators.minLength(3)] ],
  })

  constructor( private fb: FormBuilder, private groupsService:GroupsService, private activatedRoute: ActivatedRoute, private location: Location ) { }

  async ngOnInit() {
    
    this.groupID =  await this.activatedRoute.snapshot.paramMap.get('id')!
    await this.groupsService.getGrupoPorId(this.groupID!).subscribe(grupo => this.grupo =  grupo);

    
  

    await this.resetInicial();
    

   
  }
  resetInicial(){
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
    
    let nuevoGrupo : IGrupo = {nombre: this.miFormulario.controls["nombre"].value, descripcion: this.miFormulario.controls["descripcion"].value };
    this.groupsService.editarGrupo(this.groupID,nuevoGrupo).subscribe((res)=> console.log(res));
    
   
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
