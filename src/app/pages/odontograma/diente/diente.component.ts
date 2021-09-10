import { Component, OnInit, Input,  ElementRef, ViewChild, Renderer2, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DienteModel } from 'app/models/Interfaces';

@Component({
  selector: 'app-diente',
  templateUrl: './diente.component.html',
  styleUrls: ['./diente.component.css']
})
export class DienteComponent implements OnInit {
  @Input() diente: DienteModel;
  @Input() min: boolean;
  

  
  

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

  

}
