import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { MisSeriesService } from 'src/app/services/mis-series.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router,
              private misSeriesService: MisSeriesService) { }

  get switchModal(): boolean {
    return this.misSeriesService.switchModal;
  }            

  logOut() {
    this.router.navigate(['/login']);
  }
}
