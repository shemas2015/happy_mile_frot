import { MatDialogRef } from '@angular/material/dialog';
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
  public getTratamientos( page:number ):Observable<any> {
    return this.http
      .get(`${this.url}/api/tratamientos?page=${page}` , this.httpOptions );
  }


  /**
   * Consulta los tratamientos
   * @returns 
   */
   public getAllTratamientos():Observable<any> {
    return this.http
      .get(`${this.url}/api/tratamiento/getAll` , this.httpOptions );
  }

  /**
   * 
   * @param tratamiento 
   * @returns 
   */
  public guardar( tratamiento:TratamientoModel , create:boolean ) : Observable<TratamientoModel> {
    if(create){
      return this.http.post( `${this.url}/api/tratamientos` ,tratamiento, this.httpOptions )
        .pipe( map((data:any) => <TratamientoModel>data ));
    }else{
      return this.http.put( `${this.url}/api/tratamientos/${tratamiento.id}` ,tratamiento, this.httpOptions )
        .pipe( map((data:any) => <TratamientoModel>data ));
    }

  }

  public eliminar(tratamiento:TratamientoModel): Observable<any>{
    return this.http.delete(`${this.url}/api/tratamientos/${tratamiento.id}` , this.httpOptions );
  }

}
