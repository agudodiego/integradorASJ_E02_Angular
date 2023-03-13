import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Plataforma } from 'src/app/model/Plataforma.class';
import { Usuario } from 'src/app/model/Usuario.class';
import { PlataformaService } from 'src/app/services/plataforma.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formularioLogin: FormGroup;

  constructor(private construct: FormBuilder,
    private router: Router,
    private plataformasService: PlataformaService,
    private usuarioService: UsuarioService) {
    this.formularioLogin = construct.group({
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }

  loguearse() {

    const usuario = new Usuario(
      null,
      this.formularioLogin.value.usuario,
      this.formularioLogin.value.pass,
      null,
      null
    );

    this.usuarioService.logearUsuario(usuario)
      .subscribe({
        next: resp => {
          this.usuarioService.setearUsuarioLogeado(resp);
          this.plataformasService.traerPlataformas()
            .subscribe((resp: Observable<Plataforma[]>) => {
              sessionStorage.setItem('plataformas', JSON.stringify(resp));
              this.router.navigate(['/home']);
            })
          this.router.navigate(['/home']);
        },
        error: (err) => {
          Swal.fire('Credenciales incorrectas');
          this.formularioLogin.reset();
          console.log(err)
        }
      });
  }
}
