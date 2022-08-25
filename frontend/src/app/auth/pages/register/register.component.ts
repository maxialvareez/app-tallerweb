import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }


  register(){
    const { nombre, correo, password } = this.miFormulario.value;
    
    this.authService.register( nombre, correo, password ).subscribe( resp => {
      if( resp === true ){
        this.router.navigateByUrl('auth/login');
      } else {
        Swal.fire('Error', resp, 'error');
      }
    });
  }

}
