import { Component } from '@angular/core';
import {Barbero} from "../../../logica/modelos/barbero";
import {BarberoService} from "../../../logica/services/barberoService";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {AlertService} from "../../../logica/services/alertService";

@Component({
  selector: 'app-new-barbero',
  standalone: true,
  imports: [
    FormsModule,HttpClientModule,CommonModule, ReactiveFormsModule
  ],
  templateUrl: './new-barbero.component.html',
  styleUrl: './new-barbero.component.css'
})
export class NewBarberoComponent {
  barbero: Barbero ={
    id:-1,
    name:'',
    phone:'',
    email:'',
    password:''
  }

  constructor(
    private barberoService: BarberoService,
    private AlertService: AlertService) {}

  onSubmit() {
    console.log('Enviando barbero:', this.barbero);
    this.barberoService.crearBarbero(this.barbero).subscribe({
      next: () => this.AlertService.success("Barbero creado con éxito"),
      error: () => this.AlertService.error("Error al guardar barbero")
    });
  }
}
