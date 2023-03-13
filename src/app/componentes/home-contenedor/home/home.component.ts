import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { Usuario } from 'src/app/model/Usuario.class';
import { HomeService } from 'src/app/services/home.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router,
              private homeService: HomeService,
              private usuarioService: UsuarioService) { }
  
  ngOnInit() {
    
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
