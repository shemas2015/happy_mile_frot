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
    private citaService: CitasService,
    private router: Router,
    private datePipe: DatePipe
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


      var tmpDateIni = new Date(this.cita.fecha+'T'+this.cita.horaInicio)
      var tmpDateFin = new Date(this.cita.fecha+'T'+this.cita.horaFin)

      this.cita.horaInicio = this.datePipe.transform(tmpDateIni,'H:mm')
      this.cita.horaFin = this.datePipe.transform(tmpDateFin,'H:mm')
      console.log(this.cita);
    }
    
    this.citaService.getDoctores().subscribe( (doctores : DoctorModel[] ) => {
      this.doctores = doctores;
    } ) ;
    
  }


  onSubmit( f: FormGroup ) {
    //El parámetro paciente_id ,  viaja en la petición de cada consulta de las citas desde 
    //la db,si está definido quiere decir que el registo existe y se debe editar
    //IMPORTANTE! no retirarlo en la petición del front
    if( this.cita["paciente_id"] === undefined ){
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
            'No se pudo crear la cita, contacte al administrador',
            'error'
          )
        }
        );
    }else{
      this.citaService.editar(this.cita).subscribe(
        data  => { 
          swal.fire(
            '',
            'Cita editada',
            'success'
          )
          this.passBack();},
        error => { 
          swal.fire(
            'Atención!',
            'No se pudo editar la cita, contacte al administrador',
            'error'
          )
        }
        );
    }
    
  }

  compareDoctor( d1: DoctorModel, d2: DoctorModel ){
    if ( d2 == null ){
      return false;
    }
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
