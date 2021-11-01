import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TratamientosService } from './../../services/tratamientos.service';
import { TratamientoModel } from 'app/models/Interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-plan-tratamiento',
  templateUrl: './plan-tratamiento.component.html',
  styleUrls: ['./plan-tratamiento.component.css']
})
export class PlanTratamientoComponent implements OnInit {
  displayedColumns    : string[] = ["descripcion","valor"];
  tratamientosList    : TratamientoModel[] = []
  formTratamiento     : FormGroup;
  filteredOptions     : Observable<TratamientoModel[]>;
  dataSource          = new MatTableDataSource<TratamientoModel>();
  @Input() tratamientos; 

  constructor(
    private tratamientosService: TratamientosService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getTratamientos();
    this.dataSource.data = this.tratamientos;
    this.formTratamiento = this.fb.group({
      tratamientoTxt : [""]
    })
  }


  getTratamientos(){
    this.tratamientosService.getAllTratamientos()
      .subscribe( (tr:TratamientoModel[]) => {
        this.tratamientosList = tr;
        this.filteredOptions = this.formTratamiento.get("tratamientoTxt").valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      } );
  }

  private _filter(value): TratamientoModel[] {
    let filterValue;
    if( typeof(value) =="object" ){
      filterValue = value.descripcion.toLowerCase();
    }
    else{
      filterValue = value.toLowerCase();
    }
    return this.tratamientosList.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  displayProperty( tratamiento ){
    return tratamiento.descripcion;
  }

  addTratamiento( option ){
    this.tratamientos.push(option);
    this.dataSource.data = this.tratamientos;
    this.formTratamiento.get("tratamientoTxt").setValue("");
  }
  

}
