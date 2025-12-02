import { Component } from '@angular/core';
import {BarberoService} from "../../../../logica/services/barberoService";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {AlertService} from "../../../../logica/services/alertService";
import {BarberRequestDTO} from "../../../../logica/modelos/requestDTO/barberRequestDTO";
import {ScheduleRequestDTO} from "../../../../logica/modelos/requestDTO/scheduleRequestDTO";

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

  workDays: string[] = [];

  onDaySelect(event: any) {
    const day = event.target.value;

    if (event.target.checked) {
      this.workDays.push(day);
    } else {
      this.workDays = this.workDays.filter(d => d !== day);
    }

    console.log("Días seleccionados:", this.workDays);
  }


  barbero: BarberRequestDTO ={
    name:'',
    phone:'',
    email:'',
    password:'',
    schedule: {
      startTime: '',
      endTime: '',
      workDays: []
}
  }

  constructor(
    private barberoService: BarberoService,
    private AlertService: AlertService) {}

  onSubmit() {
    this.barbero.schedule.workDays = this.workDays;

    console.log('Enviando barbero:', this.barbero);
    this.barberoService.crearBarbero(this.barbero).subscribe({
      next: () => {this.AlertService.success("Barbero creado con éxito");},
      error: () => this.AlertService.error("Error al guardar barbero")
    });
  }
}
