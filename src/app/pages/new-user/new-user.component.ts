import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {client} from "../../logica/modelos/client";
import {NgClass, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AlertService} from "../../logica/services/alertService";
import {ClientService} from "../../logica/services/clientService";

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    FormsModule, NgClass, HttpClientModule, NgIf,
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  Client: client ={
    name:'',
    phone:'',
    email:'',
    password:''
  }

  constructor(
    private clientService: ClientService,
    private alertService: AlertService) {
  }

  onSubmit() {
    console.log('Enviando client:', this.Client);
    this.clientService.crearClient(this.Client).subscribe({
      next: () => this.alertService.success("Cliente creado con éxito"),
      error: () => this.alertService.error("Error al guardar cliente")
    });
  }

}
