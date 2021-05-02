import { Time } from '@angular/common';
import {CalendarEvent} from 'angular-calendar';

export interface PacienteModel{
    identificacion : string;
    nombres?       : string;
    apellidos?     : string;
}
export interface CitaModel{
    paciente   : PacienteModel;
    fecha      : Date;
    horaInicio : string;
    horaFin    : string;
    
}

