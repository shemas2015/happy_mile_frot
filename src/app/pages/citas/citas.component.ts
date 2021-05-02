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

  refresh: Subject<any> = new Subject();

  

  events: CalendarEvent [] = [
    /*
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    */
    
    {
      start: new Date(),
      end: addHours(new Date(), 1),
      title: 'Juan Sebastián Daza',
      color: colors.blue,
      draggable: true
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

  ngOnInit(): void {
  }

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
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {

    
    
    //this.modal.open(this.modalContent, { size: 'lg' });
    const modalCita = this.modal.open( CitaComponent  , {  size: 'lg' });
    //modalCita.componentInstance.cita = null;
    modalCita.componentInstance.passEntry.subscribe((cita:CitaModel) => {
        let fIni = new Date(cita.fecha);
        fIni.setHours( parseInt(cita.horaInicio.split(":")[0]) );
        fIni.setMinutes( parseInt(cita.horaInicio.split(":")[1]) );

        let fFin = new Date(cita.fecha);
        fFin.setHours( parseInt(cita.horaFin.split(":")[0]) );
        fFin.setMinutes( parseInt(cita.horaFin.split(":")[1]) );


        modalCita.close();
        
        this.events =[
          ...this.events,
          {
            title: cita.paciente.identificacion,
            start: fIni,
            end: fFin,
            color: colors.red,
            draggable: true
          }
        ];
        

        
    })
    

    //this.modal.co
    /*
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
    */
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


  

}
