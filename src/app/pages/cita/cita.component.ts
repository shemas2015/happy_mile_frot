import { Router } from '@angular/router';
import { CitasService } from './../../services/citas.service';
import { FormGroup } from '@angular/forms';
import { CitaModel, PacienteModel, DoctorModel } from './../../models/Interfaces';
import { Component, OnInit, EventEmitter, Output, Injectable, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {DatePipe, formatDate} from '@angular/common';
import swal from 'sweetalert2';



@Injectable({providedIn: 'any' })

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() public citaOut;

  cita: CitaModel;
  paciente: PacienteModel;
  horai: any;
  doctor: DoctorModel;
  

  doctores: DoctorModel[] = [];

  
  constructor(
    public activeModal: NgbActiveModal,
    private datePipe: DatePipe,
    private pipe: DatePipe,
    private citaService: CitasService,
    private router: Router
  ) { 

    
    
    
    this.cita = {
      id: 100,
      paciente: {
        id : null,
        identificacion : null,
        nombres : null,
      },
      doctor: {
        id            : null,
        nombres        : null,
        apellidos      : null,
        identificacion : null,
        color: {
          primary: '#ad2121',
          secondary: '#FAE3E3',
        }
      },
      fecha: null,
      horaInicio : null,
      horaFin: null
    };
    
    
  }

  form: FormGroup;

  ngOnInit(): void {
    //Sobreescribe el objeto cita si lo está editando
    if( this.citaOut ){
      this.cita = this.citaOut;
    }
    
    this.citaService.getDoctores().subscribe( (doctores : DoctorModel[] ) => {
      this.doctores = doctores;
    } ) ;
    
  }


  onSubmit( f: FormGroup ) {
    console.log(this.cita.doctor);
    this.citaService.crear(this.cita).subscribe(
      data  => { 
        swal.fire(
          '',
          'Cita creada',
          'success'
        )
        this.passBack();},
      error => { 
        swal.fire(
          'Atención!',
          'No se pudo crar la cita, contacte al administrador',
          'error'
        )
      }
      );
    
  }

  compareDoctor( d1: DoctorModel, d2: DoctorModel ){
    return d1.identificacion == d2.identificacion;

  }


  passBack() {
    this.passEntry.emit( this.cita );
  }

  consultaPaciente(){
    const identificacion = this.cita.paciente.identificacion;
    
    if(identificacion == null ){
      return;
    }
    this.citaService.consultaPaciente(identificacion)
      .subscribe(( data : PacienteModel ) => {
        if( data["nombres"] !== undefined ){
          this.cita.paciente = data;
        }else{
          this.cita.paciente.nombres = null;
          swal.fire({
            title: 'El paciente no existe. ¿Desea crearlo ahora?',
            showCancelButton: true,
            confirmButtonText: `Sí`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigate(['/dashboard']);
              this.activeModal.dismiss('Cross click')
            }
          })
        }

        
      });
  }
    

}
