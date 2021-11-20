import { ActivatedRoute, Router } from '@angular/router';
import { EditarComponent } from './editar/editar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from './../../models/Interfaces';
import { UsuarioService } from './../../services/usuario.service';


import { Component, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent implements OnInit {

  filtrados           : UserModel[] ;
  displayedColumns    : string[] = ['name', 'email' , 'admin' ];
  paginate;
  usuario             : UserModel;
  

  constructor( 
    private usuarioService    : UsuarioService,
    public dialog             : MatDialog,
    public route              : ActivatedRoute,
    public router             : Router
     ) { }

  ngOnInit(): void {
    const opc = this.route.snapshot.paramMap.get('out');
    if( opc == "out" ){
      this.usuarioService.closeSession().subscribe( () =>{
        localStorage.removeItem('token');
        this.router.navigate(["/login"]);
      });
    }else{
      this.usuarioService.getUsers().subscribe( ( users:UserModel[] ) => {
        this.filtrados = users;
      })

    }


    

  }



  filtrar( text:string ){
    const buscado = text.toLowerCase();
    const newTratamientos = this.filtrados.filter(( v:UserModel , i ) => 
      v.name.toLowerCase().indexOf(buscado) != -1
    );
    this.filtrados = newTratamientos;
  }



  addUsuario(){
    const dialogRef = this.dialog.open( EditarComponent , {
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  editarUsuario( usuario ){
    const dialogRef = this.dialog.open( EditarComponent , {
      width: '70%',
      data: {
        usuario: usuario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


  

}
