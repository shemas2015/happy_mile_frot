import { DatePipe } from '@angular/common';
import { CitaModel } from './../../models/Interfaces';
import { CitaComponent } from './../cita/cita.component';
import { Component, OnInit,ChangeDetectionStrategy,ViewChild,TemplateRef, } from '@angular/core';



import {
  startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours
} from 'date-fns';

import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};



@Component({
  selector: 'app-citas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})


export class CitasComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();
  events: CalendarEvent [] = [];
  citas: CitaModel[] = [];
  activeDayIsOpen: boolean = true;

  constructor(
    private modal    : NgbModal,
    private datePipe : DatePipe
    ) {}

  ngOnInit(): void {
    
    /*
    let citaOut = {
      id: 100,
      paciente: {
        identificacion: "1022324440"
      },
      doctor: {
        userId         : null,
        nombres        : "Carlos Alberto",
        apellidos      : "Perez",
        identificacion : "1002251856",
        color: {
          primary: '#ad2121',
          secondary: '#FAE3E3',
        }
      },
      fecha: new Date("2021/05/04") ,
      horaInicio : "13:00",
      horaFin:  "14:00",
    }
    
    this.citas = [
      ...this.citas,
      citaOut
    ]
    this.events = [
      ...this.events,
      {
        id   : 100,
        title: citaOut.doctor.identificacion,
        start: new Date("2021/05/04 13:00") ,
        end: new Date("2021/05/04 14:00") ,
        color: colors.red,
        draggable : true
      },
    ];
    */
    
  }

  

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    
    
  }

  /**
   * Edición de citas y eventos
   * @param action 
   * @param event 
   */
  handleEvent(action: string, event: CalendarEvent): void {
    

    let idxCita =  this.citas.findIndex( x => x.id == event.id );
    let idxEvent =  this.citas.findIndex( x => x.id == event.id );

    if( action == "Clicked" )
    {
      //Modal para editar la cita
      const modalCita = this.modal.open( CitaComponent  , {  size: 'lg' });
      modalCita.componentInstance.citaOut = this.citas[idxCita];
      modalCita.componentInstance.passEntry.subscribe((cita:CitaModel) => {

        let fIni = this.addHours(cita.fecha , cita.horaInicio);
        let fFin = this.addHours(cita.fecha , cita.horaFin);
        this.citas[idxCita] = cita;
        this.events[idxEvent] = {
          id        : cita.id,
          title     : cita.doctor.nombres +" ("+cita.horaInicio+"  - "+ cita.horaFin +") " ,
          start     : fIni,
          end       : fFin,
          color     : cita.doctor.color,
          draggable : true
        };
        modalCita.close();
      });
    }
    else if( action == "Dropped or resized" )
    {
      
      let nuevaHInicio = this.datePipe.transform(event.start, 'H:mm');
      let nuevaHFin    = this.datePipe.transform(event.end, 'H:mm');

      //Edición arrastrando el evento
      
      this.citas[idxCita].fecha      = event.start;
      this.citas[idxCita].horaInicio = nuevaHInicio;
      this.citas[idxCita].horaFin    = nuevaHFin;
      console.log(event.start);
    }
    


    

    
    
  }

  addEvent(): void {

    const modalCita = this.modal.open( CitaComponent  , {  size: 'lg' });
    
    modalCita.componentInstance.passEntry.subscribe((cita:CitaModel) => {
        let fIni = new Date(cita.fecha);
        fIni.setHours( parseInt(cita.horaInicio.split(":")[0]) );
        fIni.setMinutes( parseInt(cita.horaInicio.split(":")[1]) );

        let fFin = new Date(cita.fecha);
        fFin.setHours( parseInt(cita.horaFin.split(":")[0]) );
        fFin.setMinutes( parseInt(cita.horaFin.split(":")[1]) );
      

        modalCita.close();
        
        this.citas = [
          ...this.citas,
          cita
        ]

        this.events =[
          ...this.events,
          {
            id        : cita.id,
            title     : cita.doctor.nombres +" ("+cita.horaInicio+"  - "+ cita.horaFin +") " ,
            start     : fIni,
            end       : fFin,
            color     : cita.doctor.color,
            draggable : true
          }
        ];
        
    })
    
    
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  private addHours(fechaIn: Date , hora: string ): Date {
    let fecha = new Date(fechaIn);
    fecha.setHours( parseInt(hora.split(":")[0]) );
    fecha.setMinutes( parseInt(hora.split(":")[1]) );
    return fecha;

  }


  

}
