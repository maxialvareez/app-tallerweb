import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register(nombre: string, correo: string, password: string){

    const URL = `${ this.baseUrl }/usuarios`;
    const body = { nombre, correo, password};

    return this.http.post<AuthResponse>(URL, body)
      .pipe(
        map( resp => resp.ok ), // Se puede agregar el estado en el backend TODO
        catchError( err => of(err.error.errors[0].msg))
      );
  }

  login(correo: string, password: string){

    const URL = `${ this.baseUrl }/auth/login`;
    const body = { correo, password};

    return this.http.post<AuthResponse>(URL, body)
      .pipe(
        tap( resp => {
          if( resp.ok ){
            localStorage.setItem('token', resp.token!);
          }
        }),
        map( resp => resp.ok ), // Se puede agregar el estado en el backend TODO
        catchError( err => of(err.error.msg))
        );
  }

  validarToken(): Observable<boolean>{

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url,{ headers })
      .pipe(
        map( resp => {
          localStorage.setItem('token', resp.token!);
          return resp.ok!;
        }),
        catchError( err => of(false))
      );
  }

  
  logout(){
    localStorage.clear();
  }

  getToken(){
    return localStorage.getItem('token')
  }

}
