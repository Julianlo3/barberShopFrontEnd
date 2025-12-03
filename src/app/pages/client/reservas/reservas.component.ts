import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertService} from "../../../logica/services/alertService";
import {HttpClientModule} from "@angular/common/http";
import {cita} from "../../../logica/modelos/cita";
import {citaService} from "../../../logica/services/reservasServices";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {StorageService} from "../../../logica/services/storage-service.service";
import {BarberoService} from "../../../logica/services/barberoService";
import {BarberResponseDTO} from "../../../logica/modelos/responseDTO/barberResponseDTO";
import {ReservationRequestDTO} from "../../../logica/modelos/requestDTO/ReservationRequestDTO";
import {ScheduleResponseDTO} from "../../../logica/modelos/responseDTO/ScheduleResponseDTO";

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule, NgOptimizedImage, NgForOf,
  ],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {

  nombreCliente: string = '';

  cita: ReservationRequestDTO ={
    barberId:-1,
    clientId:-1,
    date:'',
    startTime: '',
    endTime:'',
    Services: []
}

  horarioBarbero: ScheduleResponseDTO ={
    barberId:-1,
    startTime:'',
    endTime:'',
    workDays:[]
  }

  barberos: BarberResponseDTO[] = [];

constructor(
  private alertService: AlertService,
  private citaService: citaService,private storageService: StorageService,
  private barberoService: BarberoService
){}

  ngOnInit(){
    this.cargarNombreCliente();
    this.cargarBarberos()
  }

  cargarNombreCliente(){
    const name: string = this.storageService.getUser().name;
    this.nombreCliente=name;
  }

  cargarHorarioBarbero(event: Event){
  this.barberoService.getScheduleByBarberId(this.cita.barberId).subscribe({next: (data) =>
    {
      this.horarioBarbero = data;
    },
      error: (err) => console.error("Error obteniendo horario del barbero",err)
    }
  )
  }

  cargarBarberos(){
    this.barberoService.getAllBarberos().subscribe({next: (data) =>
      {
        this.barberos = data;
      },
      error: (err) => console.error("Error obteniendo barberos",err)
    })
  }

  onSubmit(){

  }

}
