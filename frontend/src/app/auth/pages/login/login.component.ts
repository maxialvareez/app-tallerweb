import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    correo: ['test1@correo.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }


  login(){
    const { correo, password } = this.miFormulario.value;
    
    this.authService.login( correo, password ).subscribe( resp => {
      if( resp == true ){
        this.router.navigateByUrl('/groups');
      } else {
        Swal.fire('Error', resp, 'error');
      }
    });
  }

}
