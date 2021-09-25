import { TratamientoModel } from 'app/models/Interfaces';
import { TratamientosService } from './../services/tratamientos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-tratamiento',
  templateUrl: './edit-tratamiento.component.html',
  styleUrls: ['./edit-tratamiento.component.css']
})
export class EditTratamientoComponent implements OnInit {
  form          : FormGroup;
  tratamiento   : TratamientoModel;
  create        : boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data    : any,
    private fb                              : FormBuilder,
    private tratamientosService             : TratamientosService,
    private dialogRef                       : MatDialogRef<EditTratamientoComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
    if( this.data !== null ){
      this.tratamiento    = this.data["tratamiento"];
      this.create      = false;
      this.form.get("descripcion").setValue(this.tratamiento.descripcion);
      this.form.get("valor").setValue(this.tratamiento.valor);
    }else{
      this.tratamiento = {} as TratamientoModel;
      this.create         = true;
    }

  }


  initForm(){
    this.form = this.fb.group({
      descripcion   : ['', [Validators.required]],
      valor         : ['', [Validators.required]],
    });

    
  }


  /**
   * Almacena un nuevo tratamiento
   * @returns 
   */
  guardar(){
    console.log(this.form.invalid);
    if( this.form.invalid ){
      return;
    }
    this.tratamiento.descripcion    = this.form.get("descripcion").value;
    this.tratamiento.valor          = this.form.get("valor").value;
    this.tratamientosService.guardar(this.tratamiento ,this.create )
      .subscribe( (res:TratamientoModel) => {
        Swal.fire("¡Correcto!","Registro almacenado" ,"success" ) ;
        this.dialogRef.close();
      },
      error => {
        Swal.fire("¡Atención!","No se almacenó el registro, contácte al administrador" ,"error" ) ;
      }
      
    )
  }




}
