import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login-contenedor/login.component';
import { RegistroComponent } from './componentes/registro-contenedor/registro.component';
import { HomeComponent } from './componentes/home-contenedor/home/home.component';
import { BuscadorComponent } from './componentes/home-contenedor/seccion-busqueda/buscador/buscador.component';
import { MisSeriesComponent } from './componentes/home-contenedor/seccion-series/mis-series/mis-series.component';
import { ApiService } from "./services/api.service";
import { ListaSeriesBuscadasComponent } from './componentes/home-contenedor/seccion-busqueda/lista-series-buscadas/lista-series-buscadas.component';
import { MisSeriesService } from "./services/mis-series.service";
import { CardSerieComponent } from './componentes/home-contenedor/seccion-series/card-serie/card-serie.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    BuscadorComponent,
    MisSeriesComponent,
    ListaSeriesBuscadasComponent,
    CardSerieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    MisSeriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
