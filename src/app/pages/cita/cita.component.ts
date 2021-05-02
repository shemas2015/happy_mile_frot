import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CalendarEvent } from 'angular-calendar';
import { CitaModel,PacienteModel } from './../../models/Interfaces';
import { AppModule } from './../../app.module';
import { Component, OnInit, EventEmitter, Output, Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

import {DatePipe, formatDate} from '@angular/common';



@Injectable({providedIn: 'any' })

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  cita: CitaModel;
  paciente: PacienteModel;
  horai: any;
  


  

  constructor(
    public activeModal: NgbActiveModal,
    private datePipe: DatePipe,
    private pipe: DatePipe
  ) { 
    this.paciente = {
      identificacion : null
    }

    this.cita = {
      paciente: this.paciente,
      fecha: null,
      horaInicio : null,
      horaFin: null
    };

  }

  ngOnInit(): void {
    
  }


  onSubmit( f: FormGroup ) {
    
    this.passBack();
  }


  passBack() {
    //this.calendar.start = this.pipe.transform(this.calendar.start, 'yyyy-MM-dd').
    //this.calendar.start = formatDate(this.calendar.start,'yyyy-MM-dd' , 'en-Us');
    


    //console.log(this.cita);

    
    this.passEntry.emit( this.cita );
    
    }
    

}
