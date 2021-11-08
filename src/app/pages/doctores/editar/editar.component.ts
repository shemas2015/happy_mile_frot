import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from './../../../services/usuario.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  formEdit:FormGroup;


  matcher = new MyErrorStateMatcher();

  constructor(
    public fb                 : FormBuilder,
    private usuarioService    : UsuarioService,
    private dialogRef         : MatDialogRef<EditarComponent>
  ) { }
  

  ngOnInit(): void {
    this.initForm()
  }



  checkPasswords(group: FormGroup) { 
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  public initForm(){
    this.formEdit = this.fb.group({
      "nombres"           : ['' , [Validators.required] ],
      "email"             : ['' , [Validators.required , Validators.email ] ],
      "password"          : ['' , [Validators.required] ],
      "confirmPassword"   : [''  ]
    } , { validators: this.checkPasswords } )
  }


  public  guardarUsuario(){
    if( this.formEdit.invalid ){
      return;
    }


    const user = {
      name                    :  this.formEdit.get("nombres").value ,
      email                   :  this.formEdit.get("email").value ,
      password                :  this.formEdit.get("password").value ,
      password_confirmation   :  this.formEdit.get("confirmPassword").value ,
    }

    this.usuarioService.guardarUsuario(user).subscribe( res => {
      Swal.fire(
        '¡Correcto!',
        'Usuario creado correctamente!',
        'success'
      );
      this.dialogRef.close();
    } , 
    error => {
      Swal.fire(
        '¡Atención!',
        error.error,
        'error'
      );
      console.log(error);


    }
    )


  }





}
