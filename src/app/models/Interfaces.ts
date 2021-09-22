
import { Time } from '@angular/common';
import {CalendarEvent} from 'angular-calendar';


export interface ValoracionModel{
    created_at : Date;
    valoracion : string;
}

export interface DienteModel{
    numero           : number;
    exodoncia?       : boolean;
    corona?          : boolean;
    sano?            : boolean;
    ausente?         : boolean;
    provisional?     : boolean;
    sin_erupcionar?  : boolean;
    corona_adaptada? : boolean;
    vestibular?      : string;
    mesial?          : string;
    palatino?        : string;
    distal?          : string; 
    oclusal?         : string; 
    
}


export interface PacienteModel{
    id                : number;
    identificacion    : string;
    valoraciones?     : ValoracionModel[];
    nombres?          : string;
    apellidos?        : string;
    fecha_nacimiento? : string;
    lugar_nacimiento? : string;
    tipo_documento?   : string;
    sexo?             : string;
    direccion?        : string;
    telefono?         : string;
    celular?          : string;
    ocupacion?        : string;
    estado_civil?     : string;
    eps?              : string;
    acompanante?      : string;
    parentezco?       : string;
    celular_acom?     : string;
    motivo_consulta?  : string;
    dientes?          : DienteModel[]
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


export interface TratamientoModel{
    id            : number;
    descripcion   : string;
    valor         : number;
}
