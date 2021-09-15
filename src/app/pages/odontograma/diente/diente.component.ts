import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2, Inject, Optional, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { DienteModel } from 'app/models/Interfaces';

@Component({
  selector: 'app-diente',
  templateUrl: './diente.component.html',
  styleUrls: ['./diente.component.css']
})
export class DienteComponent implements OnInit {
  @Input() diente   : DienteModel;
  @Input() min      : boolean;
  marcacion         : string = null;
  @ViewChild('cariesMenuTrigger') cariesMenuTrigger: MatMenuTrigger;
  @ViewChild('obturadoMenuTrigger') obturadoMenuTrigger: MatMenuTrigger;
  

  

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any[] 
  ) {
    if( this.min == undefined ){
      this.min = true;
    }

    if ( data !== null ){
      this.diente = data["diente"];
      this.min    = data["min"];
    }
    
  }

  ngOnInit(): void {
    
  }

  /**
   * Realiza marcaciones que contemplan todo el diente
   * @param marca 
   */
  marcar( marca:string ){
    if( marca == "exodoncia" && this.diente.exodoncia !== true ){
      this.diente.exodoncia = true;
    }else if(  marca == "exodoncia" && this.diente.exodoncia === true ){
      this.diente.exodoncia = false;
    }

    if( marca == "corona" && this.diente.corona !== true ){
      this.diente.corona = true;
    }else if(  marca == "corona" && this.diente.corona === true ){
      this.diente.corona = false;
    }

    if( marca == "sano" && this.diente.sano !== true ){
      this.diente.sano = true;
    }else if(  marca == "sano" && this.diente.sano === true ){
      this.diente.sano = false;
    }

    if( marca == "ausente" && this.diente.ausente !== true ){
      this.diente.ausente = true;
    }else if(  marca == "ausente" && this.diente.ausente === true ){
      this.diente.ausente = false;
    }

    if( marca == "provisional" && this.diente.provisional !== true ){
      this.diente.provisional = true;
    }else if(  marca == "provisional" && this.diente.provisional === true ){
      this.diente.provisional = false;
    }

    if( marca == "sin_erupcionar" && this.diente.sin_erupcionar !== true ){
      this.diente.sin_erupcionar = true;
    }else if(  marca == "sin_erupcionar" && this.diente.sin_erupcionar === true ){
      this.diente.sin_erupcionar = false;
    }


    if( marca == "corona_adaptada" && this.diente.corona_adaptada !== true ){
      this.diente.corona_adaptada = true;
    }else if(  marca == "corona_adaptada" && this.diente.corona_adaptada === true ){
      this.diente.corona_adaptada = false;
    }

    if( marca == "caries"){
      this.openMenu(this.cariesMenuTrigger);
    }
    if( marca == "obturado"){
      this.openMenu(this.obturadoMenuTrigger);
    }
    
    
    


  }


  openMenu( menu ) {
    menu.openMenu();
  }
  
  closeMenu() {
    this.cariesMenuTrigger.closeMenu();
  }


  seccion( seccion:string , tipo:string ){
    if( seccion =='vestibular' && this.diente.vestibular == tipo ){
      this.diente.vestibular = "d_fill_color";
    }
    else if (seccion =='vestibular') {
      this.diente.vestibular = tipo;
    }

    if( seccion =='mesial' && this.diente.mesial == tipo ){
     this.diente.mesial = "d_fill_color";
   }
   else if (seccion =='mesial') {
      this.diente.mesial = tipo;
   }

   if( seccion =='palatino' && this.diente.palatino == tipo ){
     this.diente.palatino = "d_fill_color";
   }
   else if (seccion =='palatino') {
      this.diente.palatino = tipo;
   }

   if( seccion =='distal' && this.diente.distal == tipo ){
     this.diente.distal = "d_fill_color";
   }
   else if (seccion =='distal') {
      this.diente.distal = tipo;
   }

   if( seccion =='oclusal' && this.diente.oclusal == tipo ){
      this.diente.oclusal = "d_fill_color";
    }
    else if (seccion =='oclusal') {
      this.diente.oclusal = tipo;
    }
    

  }



  

}
