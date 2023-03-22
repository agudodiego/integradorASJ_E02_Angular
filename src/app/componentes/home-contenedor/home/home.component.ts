import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { Usuario } from 'src/app/model/Usuario.class';
import { HomeService } from 'src/app/services/home.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  switchCambiaContrasenia: boolean = false;
  isLoading: boolean = true;

  constructor(private router: Router,
    private homeService: HomeService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  switchCambio(onOff: boolean) {
    this.switchCambiaContrasenia = onOff;
  }

  onSubmit(formCont: NgForm) {
    const nuevosDatos = {
        usuario: this.usuarioService.usuarioLogeado.usuario,
        contrasenia: formCont.value.contrasenia,
        nuevaContrasenia: formCont.value.contNueva
      }
      console.log(nuevosDatos)
      
    this.usuarioService.cambiarContrasenia(nuevosDatos)
      .subscribe({
        next: (resp: any) => {
          console.log(resp)
          if (resp.success) {
            Swal.fire({
              position: 'top',
              title: 'Contraseña modificada!!',
              showConfirmButton: false,
              timer: 1500,
              background: '#686868dd',
              color: '#FF4C29'
            });
          }
        },
        error: (error) => { 
          console.log(error);
          Swal.fire({
            position: 'top',
            title: 'La contraseña no pudo ser modificada',
            showConfirmButton: false,
            timer: 1500,
            background: '#686868dd',
            color: '#FF4C29'
          }); 
        }
      });
      this.switchCambio(false);
  }

  get usuario() {
    return this.usuarioService.usuarioLogeado;
  }

  get switchModal(): boolean {
    return this.homeService.switchModal;
  }

  logOut() {
    const usuario = new Usuario(null, '', '', null, null);
    this.usuarioService.setearUsuarioLogeado(usuario);
    this.router.navigate(['/login']);
  }
}
