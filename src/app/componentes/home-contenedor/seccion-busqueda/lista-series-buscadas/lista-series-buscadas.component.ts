import {Component, Input} from '@angular/core';

import {Serie} from "../../../../model/Serie.class";
import {Plataforma} from "../../../../model/Plataforma.class";
import {MisSeriesService} from "../../../../services/mis-series.service";

@Component({
  selector: 'app-lista-series-buscadas',
  templateUrl: './lista-series-buscadas.component.html',
  styleUrls: ['./lista-series-buscadas.component.css']
})
export class ListaSeriesBuscadasComponent {

  @Input() seriesAPintar: any[] = [];

  constructor(private misSeriesService: MisSeriesService) {}

  agregarAMisSeries(serie: any) {
    this.misSeriesService.agregarSerie(serie);
  }

}
