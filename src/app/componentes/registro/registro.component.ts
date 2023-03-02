import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formularioRegistro: FormGroup;

  constructor(private construct: FormBuilder) {
    this.formularioRegistro = construct.group({
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  registrarse() {
    console.log('registrado')
  }
}
