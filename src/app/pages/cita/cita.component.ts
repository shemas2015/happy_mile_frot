import { FormGroup } from '@angular/forms';
import { CitaModel, PacienteModel, DoctorModel } from './../../models/Interfaces';
import { Component, OnInit, EventEmitter, Output, Injectable, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {DatePipe, formatDate} from '@angular/common';



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
  

  doctores: DoctorModel[] = [
    {
      userId         : null,
      nombres        : "Carlos Alberto",
      apellidos      : "Perez",
      identificacion : "1002251856",
      color          : {
                        primary: '#ad2121',
                        secondary: '#FAE3E3',
                      }
    }
  ];

  
  

  constructor(
    public activeModal: NgbActiveModal,
    private datePipe: DatePipe,
    private pipe: DatePipe
  ) { 
    this.cita = {
      id: 100,
      paciente: {
        identificacion : null
      },
      doctor: {
        userId         : null,
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

  ngOnInit(): void {
    //Sobreescribe el objeto cita si lo está editando
    if( this.citaOut ){
      this.cita = this.citaOut;
    }
    console.log(this.cita);
    
  }


  onSubmit( f: FormGroup ) {
    
    this.passBack();
  }

  compareDoctor( d1: DoctorModel, d2: DoctorModel ){
    return d1.identificacion == d2.identificacion;

  }


  passBack() {
    //this.calendar.start = this.pipe.transform(this.calendar.start, 'yyyy-MM-dd').
    //this.calendar.start = formatDate(this.calendar.start,'yyyy-MM-dd' , 'en-Us');
    


    console.log(this.cita);

    
    this.passEntry.emit( this.cita );
    
    }
    

}
