import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _switchModal: boolean = false;

  constructor() { }

  get switchModal(): boolean {
    return this._switchModal;
  }

  switchearModal(cambio: boolean) {
    this._switchModal = cambio;
  }
}
