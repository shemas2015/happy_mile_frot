import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EvolucionModel } from './../../models/Interfaces';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-evolucion',
  templateUrl: './evolucion.component.html',
  styles: [
  ]
})
export class EvolucionComponent implements OnInit {
  
  @Input() evoluciones ;
  @Output() refresh   = new EventEmitter<EvolucionModel[]>();
  dataSource          = new MatTableDataSource<EvolucionModel>();
  displayedColumns    : string[] = ["created_at","evolucion"];
  formEvolucion       : FormGroup;
  nueva               : boolean  = false;

  constructor(
    private fb:FormBuilder
  ) { 
    this.formEvolucion = this.fb.group({
      evolucion : []
    });
    
  }

  ngOnChanges(){
    this.dataSource = this.evoluciones;
    //this.formEvolucion.get("evolucion").setValue("");
    this.nueva = false;
  }

  ngOnInit(): void {
    this.dataSource = this.evoluciones;
    

    this.formEvolucion.valueChanges.subscribe( () => {
      if( this.nueva == false ){
        this.nueva = true;
        this.evoluciones.push( { evolucion : "" } as EvolucionModel );
      }

      this.evoluciones[ this.evoluciones.length - 1 ].evolucion = this.formEvolucion.get("evolucion").value;
      
    } );
    
  }

}
