import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginI } from './../../models/Interfaces';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  passwordHide = true;

  form: FormGroup;

  
  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
    
  ) {
      this.crearFormulario();
   }

  ngOnInit(): void {
    this.checkLoggin();
  }


  loguear(){
    if( this.form.invalid ){
      return;
    }

    

    
    this.usuarioService.login(this.form.value).subscribe(
      data => {
        localStorage.setItem('token',data["token"]);
        this.router.navigate(['/citas']);
      },
      error => {
        swal.fire('Login incorrecto!', 'Credenciales no válidas', 'error');
      }
    );
    
  }


  crearFormulario(){
    this.form = this.formBuilder.group({
      email    : ['' , Validators.required ],
      password : ['' , Validators.required ],
    });
  }

  /**
   * Verifica si el usuario está logueado
   */
  private checkLoggin(){

    if ( localStorage.getItem("token") == null ){
      return;
    }
    
    
    this.usuarioService.isLog(localStorage.getItem("token")).subscribe( 
        data  => { 
          this.router.navigate(['/citas']);
        } ,
        error => { 
          console.log(error);
          return false;
        } ,
        
        );
    

  }


  

}
