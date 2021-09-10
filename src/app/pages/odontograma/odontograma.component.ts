import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DienteModel } from 'app/models/Interfaces';
import { ar } from 'date-fns/locale';
import { DienteComponent } from './diente/diente.component';

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent implements OnInit {

  private grupos = new Array(8) ;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.grupos[0] = this.range(11,18 , true);
    this.grupos[1] = this.range(51,55 , true);
    this.grupos[2] = this.range(21,28 , false);
    this.grupos[3] = this.range(61,65 , false);
    this.grupos[4] = this.range(81,85 , true);
    this.grupos[5] = this.range(41,48 , true);
    this.grupos[6] = this.range(71,75 , false);
    this.grupos[7] = this.range(31,38 , false);

    
  }

  /**
   * Calcula los números dentro de un rago específico
   * @param j num inicial 
   * @param k num final
   * @param reverse true retorna arreglo descendente
   * @returns 
   */
  range(j:number, k:number , reverse: boolean )  { 
    const arr =  Array
        .apply(null, Array((k - j) + 1))
        .map( (_, n): DienteModel  =>  { 
          const diente: DienteModel = {
            numero: (n + j)
          }; 
          return  diente; 
        })
         ; 
      if ( reverse ){
        return arr.slice().reverse();
      }else{
        return arr
      }
  }

  /**
   * Abre modal y envía el objeto diente 
   * @param diente 
   */
  abrirModal( diente:DienteModel ){
    const dialogRef = this.dialog.open( DienteComponent , {
      width: '250px',
      data: {diente: diente, min: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });

    
  }

}
