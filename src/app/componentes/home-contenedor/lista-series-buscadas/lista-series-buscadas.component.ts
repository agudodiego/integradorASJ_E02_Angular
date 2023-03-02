import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-lista-series-buscadas',
  templateUrl: './lista-series-buscadas.component.html',
  styleUrls: ['./lista-series-buscadas.component.css']
})
export class ListaSeriesBuscadasComponent {

  @Input() seriesAPintar: any[] = [];

}
