import { Component, ElementRef, ViewChild } from '@angular/core';
import { Plataforma } from 'src/app/model/Plataforma.class';
import { MisSeriesService } from 'src/app/services/mis-series.service';
import { DomSanitizer } from '@angular/platform-browser';

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

  plataformas: Plataforma[] = [];
  plataformasHTML: string = '';
  temporada_actual: number = 0;
  episodio_actual: number = 0;
  
  constructor(private misSeriesService: MisSeriesService, public sanitizer: DomSanitizer) {}
  
  ngOnInit(){
    this.displayTemp = document.getElementById('TA');
    this.temporada_actual = Number(this.displayTemp.textContent);
    this.displayEpisod = document.getElementById('EA');
    this.episodio_actual = Number(this.displayEpisod.textContent);
    this.selectPlataformas = document.getElementById('selPlataforma');
    this.plataformas = this.misSeriesService.plataformas;
    this.plataformasHTML = this.generarPlataformasHTML();    
  }
  
  get mostrarDetalles() {
    return this.misSeriesService.serieConDetalle;
  }
  
  // ************ BOTONES MODAL ************
  cerrarModal() {
    this.misSeriesService.switchearModal(false);
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
    console.log('gurdar cambios')
    console.log('episodioNuevo: ',this.episodio_actual)
    console.log('temporadaNueva: ',this.temporada_actual)
    console.log('plataforma: ',this.selectPlataformas.value)
    this.misSeriesService.switchearModal(false);
  }

  eliminar() {
    console.log('eliminar serie')  
    this.misSeriesService.switchearModal(false); 
  }
}
