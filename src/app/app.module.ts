import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home-contenedor/home/home.component';
import { BuscadorComponent } from './componentes/home-contenedor/buscador/buscador.component';
import { MisSeriesComponent } from './componentes/home-contenedor/mis-series/mis-series.component';
import {ApiServiceService} from "./servicios/api-service.service";
import { ListaSeriesBuscadasComponent } from './componentes/home-contenedor/lista-series-buscadas/lista-series-buscadas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    BuscadorComponent,
    MisSeriesComponent,
    ListaSeriesBuscadasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ApiServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
