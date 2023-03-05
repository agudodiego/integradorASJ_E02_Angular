import { Component } from '@angular/core';
import { Serie } from 'src/app/model/Serie.class';
import { MisSeriesService } from 'src/app/services/mis-series.service';

@Component({
  selector: 'app-card-serie',
  templateUrl: './card-serie.component.html',
  styleUrls: ['./card-serie.component.css']
})
export class CardSerieComponent {

  constructor( private misSeriesService: MisSeriesService) {}

  get series() {
    return this.misSeriesService.misSeries;
  }

  masInfo(serie: Serie) {
    this.misSeriesService.switchearModal(true);
    
    this.misSeriesService.habilitarDetalleSerie(serie);
  }

}
