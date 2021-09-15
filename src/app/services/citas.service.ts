import { DienteModel } from 'app/models/Interfaces';
import { FormGroup } from '@angular/forms';
import { CitaModel } from './../models/Interfaces';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  url = "http://localhost:8000";

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }


  private getHeaders(){
    return  {
      headers: new HttpHeaders({
        'Authorization':  'Bearer '+ localStorage.getItem("token")
      })
    };
  }
  
  /**
   * Consulta paciente por número de identificación
   * @param identificacion 
   * @returns 
   */
  public consultaPaciente( identificacion: String ) {
    return this.http.get( `${this.url}/api/getPaciente/${identificacion}`  , this.getHeaders() );
  }


  /**
   * Consulta todos los doctores
   * @returns 
   */
  getDoctores(){
    return this.http.post( 
      this.url+"/api/getDoctores" ,{} , 
      this.getHeaders() );
  }

  /**
   * Crea una nueva cita
   * @param cita 
   * @returns 
   */
  crear(cita: CitaModel){
    const formData = {
      'fecha'       : this.datePipe.transform(cita.fecha,"yyyy-MM-dd") ,
      'doctor'      : cita.doctor.id,
      'paciente'    : cita.paciente.id,
      'hora_inicio' : cita.horaInicio,
      'hora_fin'    : cita.horaFin
    }
    return this.http.post( 
      this.url+"/api/crearCita" , formData , 
      this.getHeaders() );
  }


  /**
   * Crea una nueva cita
   * @param cita 
   * @returns 
   */
   editar(cita: CitaModel){
    const formData = {
      'id'          : cita.id,
      'fecha'       : this.datePipe.transform(cita.fecha,"yyyy-MM-dd") ,
      'doctor'      : cita.doctor.id,
      'paciente'    : cita.paciente.id,
      'hora_inicio' : cita.horaInicio,
      'hora_fin'    : cita.horaFin
    }
    return this.http.post( 
      this.url+"/api/crearCita" , formData , 
      this.getHeaders() );
  }


  /**
   * Consulta las citas activas
   */
  getCitas(){
    return this.http.post( 
      this.url+"/api/getCitas" , {} , 
      this.getHeaders() );
  }

  getCamposHistoria(){
    return this.http.get( 
      this.url+"/api/getHistoria" , 
      this.getHeaders() );
  }


  /**
   * 
   * @param form 
   * @param dientes 
   * @returns 
   */
  crearPaciente( form: FormGroup , dientes : DienteModel[] ){
    const data                  = form.value;
    data["fecha_nacimiento"]    = this.datePipe.transform(data["fecha_nacimiento"],"yyyy-MM-dd");
    data["dientes"]             = dientes;

    return this.http.post( 
      this.url+"/api/crearPaciente" , data , 
      this.getHeaders() );

  }


  getHistriaClinica(identificacion: string){
    return this.http.post( 
      this.url+"/api/getHistoriaPaciente" , {"identificacion" : identificacion} , 
      this.getHeaders() );

  }


  
}
