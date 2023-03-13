import {Component, Input} from '@angular/core';

import {Serie} from "../../../../model/Serie.class";
import {Plataforma} from "../../../../model/Plataforma.class";
import {MisSeriesService} from "../../../../services/mis-series.service";
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista-series-buscadas',
  templateUrl: './lista-series-buscadas.component.html',
  styleUrls: ['./lista-series-buscadas.component.css']
})
export class ListaSeriesBuscadasComponent {

  @Input() seriesAPintar: any[] = [];

  constructor(private misSeriesService: MisSeriesService,
              private usuarioService: UsuarioService) {}

  agregarAMisSeries(serie: any) {

    let yaEsta = false;
    this.usuarioService.usuarioLogeado.usuarioSeries!.forEach(s => {
      if (s.id_serie == serie.show.id) {
        yaEsta = true;
      }
    });
    if (!yaEsta) {
      this.misSeriesService.agregarSerie(serie);
    } else {
      Swal.fire('Ya tienes agregada la serie!');
    }  
    
  }

}
