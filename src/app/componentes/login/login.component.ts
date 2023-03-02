import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin: FormGroup;

  constructor(private construct: FormBuilder) {
    this.formularioLogin = construct.group({
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })
  }


  loguearse() {
    console.log(this.formularioLogin.value);
  }
}
