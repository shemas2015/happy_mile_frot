import { LoginI } from './../models/Interfaces';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = environment.URL;

  constructor(
    private http: HttpClient,
  ) { }

  public login (  login: LoginI){
    return this.http.post(
        this.url+"/api/login" , 
        login );
  }

  /**
   * Verificar si está logueado
   * @returns 
   */
  public isLog  ( token: string )  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer '+token
      })
    };
    
    return this.http
      .post(this.url+"/api/user" , {} ,httpOptions );
    
   
  }



}
