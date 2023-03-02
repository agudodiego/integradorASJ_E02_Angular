import {Component, ElementRef, ViewChild} from '@angular/core';
import {ApiServiceService} from "../../../servicios/api-service.service";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  @ViewChild('inputBusqueda') inputBusqueda!: ElementRef<HTMLInputElement>;

  public series: any[] = [];
  constructor( private apiService: ApiServiceService) { }

  buscarSerie() {
    const terminoBusqueda = this.inputBusqueda.nativeElement.value;

    this.apiService.getResultadosBusqueda(terminoBusqueda)
      .subscribe( (resp: any) => {
        this.series = resp;
        console.log(this.series);
      });

    this.inputBusqueda.nativeElement.value = '';
  }
}
