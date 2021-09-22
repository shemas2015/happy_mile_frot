import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TratamientoModel } from 'app/models/Interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TratamientosService {
  url = environment.URL;
  httpOptions;

  constructor(
    private http: HttpClient
  ) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer ' + localStorage.getItem("token")
      })
    };
  }


  /**
   * Consulta los tratamientos
   * @returns 
   */
  public getTratamientos():Observable<TratamientoModel[]> {
    return this.http
      .get(this.url+"/api/tratamientos" , this.httpOptions )
      .pipe( map( (data:any) => <TratamientoModel[]> data) );
  }
}
