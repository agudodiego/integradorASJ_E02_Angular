import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./componentes/login-contenedor/login.component";
import {RegistroComponent} from "./componentes/registro-contenedor/registro.component";
import {HomeComponent} from "./componentes/home-contenedor/home/home.component";
import { autorizacionGuardFn } from './services/guards/autorizacionFn.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {
    path: 'home', component: HomeComponent,
    canActivate: [ autorizacionGuardFn ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
