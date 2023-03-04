import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mis-series',
  templateUrl: './mis-series.component.html',
  styleUrls: ['./mis-series.component.css']
})
export class MisSeriesComponent {

  seriesSeleccionadas: any;
  containerWidth: any;

  ngOnInit(){    
    this.seriesSeleccionadas = document.getElementById('seriesSeleccionadas');
    let containerDimensiones = this.seriesSeleccionadas.getBoundingClientRect();
    this.containerWidth = containerDimensiones.width;
  }
  
  previo() {
    this.seriesSeleccionadas.scrollLeft -= this.containerWidth;
  }
  
  proximo() {
    this.seriesSeleccionadas.scrollLeft += this.containerWidth;
  }


}
