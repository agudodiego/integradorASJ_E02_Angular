import { Component } from '@angular/core';
import { Serie } from 'src/app/model/Serie.class';
import { HomeService } from 'src/app/services/home.service';
import { MisSeriesService } from 'src/app/services/mis-series.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-card-serie',
  templateUrl: './card-serie.component.html',
  styleUrls: ['./card-serie.component.css']
})
export class CardSerieComponent {

  constructor( private misSeriesService: MisSeriesService, private homeService: HomeService, private usuarioService: UsuarioService) {}

  get series() {
    return this.usuarioService.seriesDelUsuario;
    // return this.misSeriesService.misSeries;
  }

  masInfo(serie: Serie) {
    this.homeService.switchearModal(true);
    this.usuarioService.habilitarDetalleSerie(serie);
    // this.misSeriesService.habilitarDetalleSerie(serie);
  }

}
