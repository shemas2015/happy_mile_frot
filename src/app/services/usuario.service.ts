import { Observable } from 'rxjs';
import { LoginI } from './../models/Interfaces';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = environment.URL;
  httpOptions; 

  constructor(
    private http: HttpClient,
  ) { 

    this.setToken();

  }


  public setToken(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer '+localStorage.getItem("token")
      })
    };

  }

  public login (  login: LoginI){
    return this.http.post(
        this.url+"/api/login" , 
        login );
  }

  /**
   * Verificar si está logueado
   * @returns 
   */
  public isLog  (  )  {
    return this.http
      .post(this.url+"/api/user" , {} ,this.httpOptions );
  }


  public getUsers() : Observable<any> {
    return this.http.get(this.url+"/api/users" , this.httpOptions)
  }


  public guardarUsuario( user:any ) : Observable<any> {
    return this.http.post(this.url+"/api/register" , user , this.httpOptions)
  }

  public editarUsuario( user:any ) : Observable<any> {
    return this.http.post(this.url+"/api/users" , user , this.httpOptions)
  }





}
