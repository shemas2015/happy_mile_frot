import { UserModel } from './../../../models/Interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from './../../../services/usuario.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
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
  formEdit    : FormGroup;
  usuario     : UserModel;
  edit        : boolean = false;


  matcher = new MyErrorStateMatcher();

  constructor(
    public fb                               : FormBuilder,
    private usuarioService                  : UsuarioService,
    private dialogRef                       : MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data    : any,
  ) { }
  

  ngOnInit(): void {
    if( this.data == undefined  ){
      this.edit = false;
    }
    else
    {
      this.usuario    = this.data["usuario"];
      this.edit       = true;
    }
    
    this.initForm()
  }



  checkPasswords(group: FormGroup) { 
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  public initForm(){
    if( this.edit ){
      this.formEdit = this.fb.group({
        "nombres"           : [ this.usuario.name , [Validators.required] ],
        "email"             : [ this.usuario.email , [Validators.required , Validators.email ] ],
        "password"          : [''  ],
        "confirmPassword"   : [''  ]
      } , { validators: this.checkPasswords } )
      

    }
    else
    {
      
      this.formEdit = this.fb.group({
        "nombres"           : ['' , [Validators.required] ],
        "email"             : ['' , [Validators.required , Validators.email ] ],
        "password"          : ['' , [Validators.required] ],
        "confirmPassword"   : [''  ]
      } , { validators: this.checkPasswords } )
      

    }
    
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



    let usuarioServiceSave;
    if( this.edit ){
      user["id"] = this.usuario.id;
      usuarioServiceSave = this.usuarioService.editarUsuario(user)
    }
    else
    {
      usuarioServiceSave = this.usuarioService.guardarUsuario(user)
    }

    usuarioServiceSave.subscribe( res => {
      Swal.fire(
        '¡Correcto!',
        'Usuario almacenado correctamente!',
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
    }
    )

  }





}
