import { Time } from '@angular/common';
import {CalendarEvent} from 'angular-calendar';

export interface PacienteModel{
    id             : number;
    identificacion : string;
    nombres?       : string;
    apellidos?     : string;
}

export interface DoctorModel{
    id             : number;
    nombres        : string;
    apellidos      : string;
    identificacion : string;
    color?         : {
                        primary   :string;
                        secondary :string;
                    };

}

export interface CitaModel{
    id         : number;
    paciente   : PacienteModel;
    doctor     : DoctorModel;
    fecha      : Date;
    horaInicio : string;
    horaFin    : string;
}



export interface LoginI{
    email    : string,
    password : string
}



