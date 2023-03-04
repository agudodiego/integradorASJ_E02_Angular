import {Component, ElementRef, ViewChild} from '@angular/core';
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  @ViewChild('inputBusqueda') inputBusqueda!: ElementRef<HTMLInputElement>;

  public series: any[] = [];

  constructor( private apiService: ApiService ) { }

  buscarSerie() {
    const terminoBusqueda = this.inputBusqueda.nativeElement.value;

    this.apiService.getResultadosBusqueda(terminoBusqueda)
      .subscribe( (resp: any) => {
        this.series = resp;
      });

    this.inputBusqueda.nativeElement.value = '';
  }
}
