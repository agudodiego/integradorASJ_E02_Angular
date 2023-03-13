import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Serie } from 'src/app/model/Serie.class';
import { Usuario } from 'src/app/model/Usuario.class';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formularioRegistro: FormGroup;

  constructor(private router: Router, private construct: FormBuilder, private usuarioService: UsuarioService) {
    this.formularioRegistro = construct.group({
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  registrarse() {

    const series: Serie[] = [];
    const usuario = new Usuario(
      null,
      this.formularioRegistro.value.usuario,
      this.formularioRegistro.value.pass,
      this.formularioRegistro.value.email,
      series
    );

    this.usuarioService.registrarUsuario(usuario)
      .subscribe({
        next: (resp)=> {
          // console.log(resp)
          Swal.fire('Usuario Registrado con Éxito!');
          this.router.navigate(['/login']);
        },
        error: (err)=> {
          Swal.fire('Credenciales incorrectas');
          this.formularioRegistro.reset();
          console.log(err)
        }
      });
  }
}