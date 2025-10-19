import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent { 
  formulario:FormGroup;

  constructor (private loginService:LoginService, private fg: FormBuilder){
    this.formulario = fg.group(
      {
        usuario:['', Validators.required],
        password:['', Validators.required]
      }
    )
  }
 
  Ingresar(){
   let data = this.formulario.value;
   this.loginService.ValidarUsuario(data.usuario,data.password).subscribe({
    next: (result)=>{
      alert(result);
    }
   });
  }


}
