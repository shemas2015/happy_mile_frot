import { Paginate } from './../../models/Interfaces';
import { EditTratamientoComponent } from './../../edit-tratamiento/edit-tratamiento.component';
import { TratamientosService } from './../../services/tratamientos.service';
import { Component, OnInit } from '@angular/core';
import { TratamientoModel } from 'app/models/Interfaces';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css']
})
export class TratamientosComponent implements OnInit {
  
  displayedColumns    : string[] = ['descripcion', 'valor' ,'admin' ];
  tratamientos        : TratamientoModel[] ;
  filtrados           : TratamientoModel[] ;
  paginate            : Paginate
  
  
  
  constructor(
    private tratamientoServie: TratamientosService,
    public dialog: MatDialog
    ) { }
    
    ngOnInit(): void {
      this.getTratamientos(0);
    }
    
    
    
    private getTratamientos( page:number ){
      this.tratamientoServie.getTratamientos(page)
      .subscribe( res => {
        this.paginate     = res;
        this.tratamientos = res["data"];
        this.filtrados    = res["data"];
      } )
    }
    
    
    
    addTratamiento(){
      const dialogRef = this.dialog.open(EditTratamientoComponent ,{
        width : '60%'
      } );
      dialogRef.afterClosed().subscribe(result => {
        this.getTratamientos(this.paginate.current_page)
      });
    }
    
    /**
    * Editar tratamiento
    * @param tratamiento 
    */
    editarTratamiento( tratamiento: TratamientoModel ){
      const dialogRef = this.dialog.open(EditTratamientoComponent ,{
        width : '60%',
        data  : {
          tratamiento: tratamiento
        } 
      }, );
      dialogRef.afterClosed().subscribe(result => {
        this.getTratamientos(this.paginate.current_page)
      });
    }
    
    /**
    * Confirma y elimina un registro
    * @param tratamiento 
    */
    eliminar( tratamiento:TratamientoModel ){
      Swal.fire({
        title: '¿Realmente desea eliminar este registro?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.tratamientoServie.eliminar(tratamiento)
          .subscribe( res =>  {
            Swal.fire("¡Correcto!","Registro eliminado" ,"success" ) ;
            this.getTratamientos(this.paginate.current_page);
          },
          error => {
            Swal.fire("¡Atención!","No se eliminó el registro, contácte al administrador" ,"error" ) ;
          }
          )
        } 
      })
    }
    
    
    
    
    pageEvent(event: any) {
      const newPage = event.pageIndex + 1;
      if( newPage > this.paginate.current_page ) {
        this.getTratamientos(newPage)
      } else {
        this.getTratamientos(newPage)
      }
      
    }


    filtrar( text:string ){
      const buscado = text.toLowerCase();
      const newTratamientos = this.tratamientos.filter(( v:TratamientoModel , i ) => 
        v.descripcion.toLowerCase().indexOf(buscado) != -1
      );
      this.filtrados = newTratamientos;
    }
    
    
    
    
    
    
    
  }
  