import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGasto } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-agregar-gasto',
  templateUrl: './agregar-gasto.component.html',
  styleUrls: ['./agregar-gasto.component.css']
})
export class AgregarGastoComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ , [ Validators.required, Validators.minLength(3) ]   ],
    descripcion: [ , [ Validators.required, Validators.min(10)] ],
  })

 groupId:string = "";

  constructor( private fb: FormBuilder, private groupsService:GroupsService,  private activatedRoute: ActivatedRoute, private location: Location) { }

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
    this.groupsService.usuario
    let nuevoGasto : IGasto = {nombre: this.miFormulario.controls["nombre"].value, descripcion: this.miFormulario.controls["descripcion"].value, costo:400,pago:false };
    this.groupsService.agregarGasto(nuevoGasto, this.groupId).subscribe((res)=> console.log(res));
    
   
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
