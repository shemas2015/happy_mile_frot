import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CitasService } from '../../services/citas.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { PacienteModel, DienteModel } from 'app/models/Interfaces';

import { Subscription } from 'rxjs';






@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})

export class PacientesComponent implements OnInit {
  dataTable         : any = [];
  verDatosP         : boolean = false;
  paciente          : PacienteModel;
  forma             : FormGroup;
  myFormGroupSubs   : Subscription;
  displayedColumns  : string[] = ['fecha', 'valoracion'];
  private dientes   : DienteModel[];
  

  constructor(
    private citasService : CitasService,
    private formBuilder  : FormBuilder
  ) {
    
  } 

  ngOnInit(): void {
    this.crearFormulario();
    
  }

  crearFormulario(){
    let formFields = {
      identificacion   : [ '' , Validators.required ],
      nombres          : [ '' , Validators.required],
      apellidos        : [ '' , Validators.required],
      direccion        : [ '' , Validators.required],
      fecha_nacimiento : [ '' , Validators.required],
      lugar_nacimiento : [ '' , Validators.required],
      tipo_documento   : [ '' , Validators.required],
      sexo             : [ '' , Validators.required],
      telefono         : [],
      celular          : [ '' , Validators.required],
      ocupacion        : [],
      estado_civil     : [],
      eps              : [ '' , Validators.required],
      motivo_consulta  : [ '' , Validators.required],
      valoracion       : [ '' ],
    };

    this.forma = this.formBuilder.group(formFields);
    
    

    /**Consulta los campos de la historia clinica */
    
    this.citasService.getCamposHistoria().subscribe( (campos:any[]) => {
      for (let index = 0; index < campos.length; index += 2) {
        
        this.dataTable.push(
          {col_1: campos[index].Comment, 
          opc_1: campos[index].Field, 
          col_2: campos[index + 1] ? campos[index + 1].Comment : null, 
          opc_2: campos[index + 1] ? campos[index + 1].Field : null},
        );
        

        this.forma.addControl(campos[index].Field, new FormControl(false, Validators.required));
        
        if( campos[index + 1] ){
          this.forma.addControl(campos[index + 1].Field, new FormControl(false, Validators.required));
        }
        


      }
    });
    


    
  }


  hasError(controlName: string): boolean {
    //const isSubmitted = form && form.submitted;
    const control = this.forma.get(controlName);
    return control.invalid && control.touched ;
  }

  /**
   * Verifica si un paciente existe
   */
  validaPaciente(){
    let id = this.forma.get("identificacion").value;
    this.verDatosP = false;
    this.citasService.consultaPaciente(id)
      .subscribe( ( paciente:PacienteModel ) => {
        
        
        if ( paciente.identificacion == undefined  ){
          swal.fire({
            title: 'El paciente no existe. ¿Desea crearlo ahora?',
            showCancelButton: true,
            confirmButtonText: `Sí`
          }).then((result) => {
            if (result.isConfirmed) {
              this.verDatosP = true;              
            }
          })
        }else{
          this.paciente = paciente;
          this.verDatosP = true;
          this.forma.controls['nombres'].setValue( this.paciente.nombres );
          this.forma.controls['apellidos'].setValue( this.paciente.apellidos );
          this.forma.controls['fecha_nacimiento'].setValue( this.paciente.fecha_nacimiento);
          this.forma.controls['lugar_nacimiento'].setValue( this.paciente.lugar_nacimiento);
          this.forma.controls['tipo_documento'].setValue( this.paciente.tipo_documento);
          this.forma.controls['sexo'].setValue( this.paciente.sexo);
          this.forma.controls['direccion'].setValue( this.paciente.direccion);
          this.forma.controls['telefono'].setValue( this.paciente.telefono);
          this.forma.controls['celular'].setValue( this.paciente.celular);
          this.forma.controls['ocupacion'].setValue( this.paciente.ocupacion);
          this.forma.controls['estado_civil'].setValue( this.paciente.estado_civil);
          this.forma.controls['eps'].setValue( this.paciente.eps);

          //this.form.controls['acompañante'].setValue( this.paciente.acompañante);
          //this.form.controls['parentezco'].setValue( this.paciente.parentezco);
          //this.form.controls['celular_acom'].setValue( this.paciente.celular_acom);
          
          this.forma.controls['motivo_consulta'].setValue( this.paciente.motivo_consulta);


          //Consulta el histórico de la história clinica
          this.citasService.getHistriaClinica(id).subscribe( (data:any) => {
            const keys = Object.keys(data);
            for (let index = 0; index < keys.length; index++) {
              if( 
                typeof(this.forma.controls[keys[index]]) !== "undefined" &&
                typeof(data[keys[index]]) == "boolean" ){

                  this.forma.controls[keys[index]].setValue(  data[keys[index]] );
              }
            }
            
          }); 
        }

        


    })
  }

  /**
   * Almacena cambios en un paciente
   */
  public guardar(){
    this.forma.markAllAsTouched();
    if( this.forma.invalid  ){
      swal.fire({
        icon:   'error',
        title:  'Atención',
        text:   'Verifique los campos obligatorios'
      })
    }else{
      this.citasService.crearPaciente(this.forma , this.paciente )
        .subscribe((data:PacienteModel) => {
            this.paciente = data;
            swal.fire({
              icon: 'success',
              text: 'Registro almacenado correctamente'
            });
            this.forma.get("valoracion").setValue("");
          },
          error => {
            swal.fire({
              icon: 'error',
              title: 'Atención',
              text: 'No se almacenó el registro, contacte al administrador'
            })
          }
        );
    }
  }

  /**
   * Carga el arreglo de dientes
   * @param e 
   */
  setDientes( e:DienteModel[] ){
    this.dientes = e;
  }





}

