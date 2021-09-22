import { TratamientosService } from './../../services/tratamientos.service';
import { Component, OnInit } from '@angular/core';
import { TratamientoModel } from 'app/models/Interfaces';



@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css']
})
export class TratamientosComponent implements OnInit {

  displayedColumns: string[] = ['descripcion', 'valor' ,'admin' ];
  
  dataSource:TratamientoModel[] ;
  
  constructor(
    private tratamientoServie: TratamientosService
  ) { }

  ngOnInit(): void {
    this.tratamientoServie.getTratamientos()
      .subscribe( res => {
        this.dataSource = res;
        console.log(res)
      } )
  }





}
