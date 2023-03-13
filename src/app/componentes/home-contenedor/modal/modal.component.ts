import { Component } from '@angular/core';
import { Plataforma } from 'src/app/model/Plataforma.class';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from 'src/app/services/home.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Relacion } from 'src/app/model/Relacion.class';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  
  //DOM
  displayTemp: any;
  displayEpisod: any;
  selectPlataformas: any;

  //MODAL
  plataformas: Plataforma[] = [];
  plataformasHTML: string = '';
  temporada_actual: number = 0;
  episodio_actual: number = 0;
  
  constructor(private homeService: HomeService, 
              private usuarioService: UsuarioService,
              public sanitizer: DomSanitizer) {}
  
  ngOnInit(){
    this.displayTemp = document.getElementById('TA');
    this.temporada_actual = Number(this.displayTemp.textContent);
    this.displayEpisod = document.getElementById('EA');
    this.episodio_actual = Number(this.displayEpisod.textContent);
    this.selectPlataformas = document.getElementById('selPlataforma');
    this.plataformas = JSON.parse(sessionStorage.getItem('plataformas')!);
    this.plataformasHTML = this.generarPlataformasHTML();    
  }
  
  get mostrarDetalles() {
    return this.usuarioService.serieConDetalle;
  }
  
  // ************ BOTONES MODAL ************
  cerrarModal() {
    this.homeService.switchearModal(false);
  }

  sumarT() {
    if (this.temporada_actual < this.mostrarDetalles.temporadas) {
      this.temporada_actual++;
      this.displayTemp.textContent = this.temporada_actual;
    }
  }
  
  restarT() {
    if (this.temporada_actual > 0) {
      this.temporada_actual--;
      this.displayTemp.textContent = this.temporada_actual;
    }
  }
  
  sumarE() {
    if (this.episodio_actual < this.mostrarDetalles.episodios) {
      this.episodio_actual++;
      this.displayEpisod.textContent = this.episodio_actual; 
    }  
  }
  
  restarE() {
    if (this.episodio_actual > 0){
      this.episodio_actual--;
      this.displayEpisod.textContent = this.episodio_actual;
    }
  }
  
  generarPlataformasHTML(): string {
    let plataformasHTML: string = '';
    this.plataformas.forEach((pl) => {
      if (pl.plataforma == this.mostrarDetalles.plataforma.plataforma) {
        plataformasHTML += `<option value="${this.mostrarDetalles.plataforma.plataforma}" selected>${this.mostrarDetalles.plataforma.plataforma}</option>`;
      } else {
        plataformasHTML += `<option value="${pl.plataforma}">${pl.plataforma}</option>`;
      };
    });
    return plataformasHTML;
  }

  // TODO este metodo envia la info al servicio (UPDATE)
  guardar() {
    console.log('guardar serie')  
    const relacion = this.armarObjetoRelacion(true);
    this.usuarioService.actualizarRelacion(relacion);// .subscribe
    this.homeService.switchearModal(false);
  }
  
  eliminar() {
    console.log('eliminar serie')  
    const relacion = this.armarObjetoRelacion(false);
    this.usuarioService.actualizarRelacion(relacion);// .subscribe
    this.homeService.switchearModal(false); 
  }

  armarObjetoRelacion(onOff: boolean): Object {
    const plat = this.plataformas.find((p)=> p.plataforma == this.selectPlataformas.value);
    const idUsuario = this.usuarioService.usuarioLogeado.id_usuario;
    const idSerie = this.mostrarDetalles.id_serie;

    const relacion = {
      usuario: {id_usuario: idUsuario},
      serie: {id_serie: idSerie},
      temp_actual: this.temporada_actual,
      episod_actual: this.episodio_actual,
      activa: onOff,
      plataforma: plat
    }

    console.log(relacion);
    return relacion;
  }
}
