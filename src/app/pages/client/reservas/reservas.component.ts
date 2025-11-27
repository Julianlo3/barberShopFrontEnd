import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertService} from "../../../logica/services/alertService";
import {HttpClientModule} from "@angular/common/http";
import {cita} from "../../../logica/modelos/cita";
import {citaService} from "../../../logica/services/citasService";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule, NgOptimizedImage,
  ],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  cita: cita ={
    nombreCliente:"",
    nombreBarbero:"",
    fechaCita:'',
    horaCita:'',
}

constructor(
  private alertService: AlertService,
  private citaService: citaService
){}

  onSubmit(){
    console.log('Enviando cita:', this.cita);
    this.citaService.crearCita(this.cita).subscribe({
      next: () => this.alertService.success("Cita creado con éxito"),
      error: () => this.alertService.error("Cita al guardar cliente")
    });
  }

}
