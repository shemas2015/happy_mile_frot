import { Time } from '@angular/common';
import {CalendarEvent} from 'angular-calendar';

export interface PacienteModel{
    identificacion : string;
    nombres?       : string;
    apellidos?     : string;
}

export interface DoctorModel{
    userId         : number;
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



