import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formulario: FormGroup;

  constructor(private loginService: LoginService, private fg: FormBuilder, private route: Router) {
    this.formulario = fg.group(
      {
        usuario: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }

  Ingresar() {
    let data = this.formulario.value;


    this.loginService.ObtenerUsuario(data.usuario).subscribe({
      next: (login) => {
        
        this.loginService.ValidarUsuario(data.usuario, data.password).subscribe({
          next: (result) => {
            if (!result) {
              this.ModalError();
            }
            else {
              var id = login.id;
              this.route.navigate(['inicio',id]);
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ModalError() {
    Swal.fire({
      title: "Login fallido",
      text: "Los datos son incorrectos, intenta de nuevo.",
      icon: "info"
    });
  }


}
