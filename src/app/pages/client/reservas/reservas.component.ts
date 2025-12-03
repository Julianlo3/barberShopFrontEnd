import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertService} from "../../../logica/services/alertService";
import {HttpClientModule} from "@angular/common/http";
import {citaService} from "../../../logica/services/reservasServices";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {StorageService} from "../../../logica/services/storage-service.service";
import {BarberoService} from "../../../logica/services/barberoService";
import {BarberResponseDTO} from "../../../logica/modelos/responseDTO/barberResponseDTO";
import {ReservationRequestDTO} from "../../../logica/modelos/requestDTO/ReservationRequestDTO";
import {ScheduleResponseDTO} from "../../../logica/modelos/responseDTO/ScheduleResponseDTO";
import {ServicioService} from "../../../logica/services/servicioService";
import {ServicesResponseDTO} from "../../../logica/modelos/responseDTO/servicesResponseDTO";

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule, NgOptimizedImage, NgForOf, NgIf,
  ],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {

  nombreCliente: string = '';
  public servicios: ServicesResponseDTO[] = [];
  selectedServiceIds: number[] = [];
  horaSalidaEstimada: string = "";

  cita: ReservationRequestDTO ={
    barberId:-1,
    clientId:-2,
    date:'',
    startTime: '',
    endTime:'',
    services: []
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
  private barberoService: BarberoService,private servicioService: ServicioService,
){}

  ngOnInit(){
    this.cargarNombreCliente();
    this.cargarBarberos();
    this.cargarServicios();
  }

  get serviciosSeleccionados() {
    return this.servicios.filter(s => this.selectedServiceIds.includes(s.id));
  }

  onServiceSelect(event: any) {
    const serviceId = Number(event.target.value);

    if (event.target.checked) {
      this.selectedServiceIds.push(serviceId);
    } else {
      this.selectedServiceIds = this.selectedServiceIds.filter(id => id !== serviceId);
    }

    this.cita.services = [...this.selectedServiceIds];
    this.calcularHoraSalida();
  }

  // helpers (añade dentro de tu clase ReservasComponent)

  /** Parsea '15:03' o '3:03 pm' a {hours, minutes} o null si no válido */
  private parseTimeString(timeStr: string | undefined): { hours: number; minutes: number } | null {
    if (!timeStr) return null;
    const t = timeStr.trim().toLowerCase();

    // Formato con am/pm: "3:03 pm" o "03:03pm"
    const ampm = t.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);
    if (ampm) {
      let h = parseInt(ampm[1], 10);
      const m = parseInt(ampm[2], 10);
      const suffix = ampm[3];
      if (suffix === 'pm' && h < 12) h += 12;
      if (suffix === 'am' && h === 12) h = 0;
      return { hours: h, minutes: m };
    }

    // Formato 24h "15:03" o "03:03"
    const simple = t.match(/^(\d{1,2}):(\d{2})$/);
    if (simple) {
      const h = parseInt(simple[1], 10);
      const m = parseInt(simple[2], 10);
      return { hours: h, minutes: m };
    }

    return null;
  }

  /** Obtiene los objetos de servicio seleccionados a partir de selectedServiceIds */
  private getServiciosSeleccionados(): ServicesResponseDTO[] {
    return this.servicios.filter(s => this.selectedServiceIds.includes(Number((s as any).id)));
  }

  /** Calcula la hora estimada de salida y la guarda en this.horaSalidaEstimada y this.cita.endTime */
  calcularHoraSalida() {
    // Si no hay hora de inicio o no hay servicios seleccionados -> limpiar
    if (!this.cita.startTime || this.selectedServiceIds.length === 0) {
      this.horaSalidaEstimada = '';
      this.cita.endTime = '';
      return;
    }

    const parsed = this.parseTimeString(this.cita.startTime);
    if (!parsed) {
      // hora inválida
      console.warn('Hora inicio no válida:', this.cita.startTime);
      this.horaSalidaEstimada = '';
      this.cita.endTime = '';
      return;
    }

    // construir fecha base (hoy) con la hora de inicio
    const fecha = new Date();
    fecha.setSeconds(0, 0);
    fecha.setHours(parsed.hours, parsed.minutes, 0, 0);

    // sumar las duraciones de los servicios seleccionados
    const serviciosSeleccionados = this.getServiciosSeleccionados();

    // Si el campo de duración se llama 'duration' o 'duracion' lo manejamos
    const totalMinutos = serviciosSeleccionados.reduce((acc, s) => {
      const d = (s as any).duration ?? (s as any).duracion ?? 0;
      const minutos = Number(d) || 0;
      return acc + minutos;
    }, 0);

    fecha.setMinutes(fecha.getMinutes() + totalMinutos);

    // formato HH:mm (24h)
    const salidaH = fecha.getHours().toString().padStart(2, '0');
    const salidaM = fecha.getMinutes().toString().padStart(2, '0');
    const salida = `${salidaH}:${salidaM}`;

    this.horaSalidaEstimada = salida;
    this.cita.endTime = salida;
  }


  onStartTimeChange() {
    this.calcularHoraSalida();
  }

  isServicioSeleccionado(serviceId: number): boolean {
    return this.selectedServiceIds.includes(serviceId);
  }

  cargarServicios() {
    this.servicioService.getServicios().subscribe(
      servicios => this.servicios = servicios
    )
  }

  cargarNombreCliente(){
    const name: string = this.storageService.getUser().name;
    this.nombreCliente=name;
    this.cita.clientId = this.storageService.getUser().id;
  }

  cargarHorarioBarbero(event: Event){
  this.barberoService.getScheduleByBarberId(this.cita.barberId).subscribe({next: (data) =>
    {
      this.horarioBarbero = data;
      this.cita.barberId = data.barberId;
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
    console.log("creando cita" + this.cita.barberId + " " + this.cita.clientId + " " + this.cita.date + " " + this.cita.startTime + " " + this.cita.endTime + " " + this.cita.services);
    this.citaService.crearCita(this.cita).subscribe({next: () => {this.alertService.success("Reserva creada con exito");},error: (err) => {this.alertService.error("Error al crear reserva");console.error("Error al crear reserva"+err);}})
  }

}
