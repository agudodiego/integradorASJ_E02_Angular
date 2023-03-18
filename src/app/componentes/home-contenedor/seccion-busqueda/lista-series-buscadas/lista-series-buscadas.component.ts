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
      Swal.fire({
        position: 'top',
        title: 'La serie ya está en tu lista!!',
        showConfirmButton: false,
        timer: 1500,
        background: '#686868dd',
        color: '#FF4C29'
      })
    }  
    
  }

}
