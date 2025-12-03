import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { citaService } from "../../../logica/services/reservasServices";
import { StorageService } from "../../../logica/services/storage-service.service";
import { ReservationResponseDTO } from "../../../logica/modelos/responseDTO/ReservationResponseDTO";
import { ServicioService } from "../../../logica/services/servicioService";
import { ServicesResponseDTO } from "../../../logica/modelos/responseDTO/servicesResponseDTO";
import { BarberoService } from "../../../logica/services/barberoService";
import { BarberResponseDTO } from "../../../logica/modelos/responseDTO/barberResponseDTO";

@Component({
  selector: 'app-myday',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './myday.component.html',
  styleUrls: ['./myday.component.css']
})
export class MydayComponent implements OnInit {
  // Datos del barbero
  nombreBarbero: string = '';
  barberoInfo: BarberResponseDTO | null = null;

  // Fecha seleccionada
  fechaSeleccionada: string = '';

  // Reservas
  reservas: ReservationResponseDTO[] = [];
  reservasOrganizadas: any = {};
  reservasDelDia: ReservationResponseDTO[] = [];

  // Horarios
  horasDelDia: string[] = [];
  intervalosPorHora: string[] = ['00', '15', '30', '45'];

  // Estadísticas
  totalReservasHoy: number = 0;
  reservasPendientesHoy: number = 0;
  reservasConfirmadasHoy: number = 0;
  reservasCanceladasHoy: number = 0;

  // Servicios
  servicios: ServicesResponseDTO[] = [];

  constructor(
    private http: HttpClient,
    private citaService: citaService,
    private storageService: StorageService,
    private servicioService: ServicioService,
    private barberoService: BarberoService
  ) { }

  ngOnInit() {
    this.inicializarFecha();
    this.generarHorasDelDia();
    this.cargarDatosBarbero();
    this.cargarServicios();
    this.cargarReservas();
  }

  // Inicializar fecha con hoy
  inicializarFecha() {
    const hoy = new Date();
    this.fechaSeleccionada = hoy.toISOString().split('T')[0];
  }

  // Generar horas del día (7am a 8pm)
  generarHorasDelDia() {
    this.horasDelDia = [];
    for (let h = 7; h <= 20; h++) {
      const hora = h.toString().padStart(2, "0") + ":00";
      this.horasDelDia.push(hora);
    }
  }

  // Cargar datos del barbero
  cargarDatosBarbero() {
    const userId = this.storageService.getUser()?.id;
    if (userId) {
      this.barberoService.getBarberoById(userId).subscribe({
        next: (barbero) => {
          this.barberoInfo = barbero;
          this.nombreBarbero = barbero.name || 'Barbero';
        },
        error: (err) => {
          console.error('Error cargando datos del barbero:', err);
          this.nombreBarbero = this.storageService.getUser()?.name || 'Barbero';
        }
      });
    }
  }

  // Cargar servicios
  cargarServicios() {
    this.servicioService.getServicios().subscribe({
      next: (servicios) => {
        this.servicios = servicios;
      },
      error: (err) => {
        console.error('Error cargando servicios:', err);
      }
    });
  }

  // Cargar reservas del barbero
  cargarReservas() {
    const userId = this.storageService.getUser()?.id;
    if (userId) {
      this.citaService.getReservationsByBarberId(1).subscribe({
        next: (data) => {
          this.reservas = data;
          this.organizarReservas(data);
          this.filtrarReservasPorFecha();
          this.calcularEstadisticas();
        },
        error: (err) => {
          console.error('Error cargando reservas:', err);
        }
      });
    }
  }

  // Organizar reservas por fecha y hora
  organizarReservas(reservas: ReservationResponseDTO[]) {
    this.reservasOrganizadas = {};

    reservas.forEach(r => {
      if (!this.reservasOrganizadas[r.date]) {
        this.reservasOrganizadas[r.date] = {};
      }

      // Dividir la reserva en intervalos de 15 minutos
      const start = this.convertirHora(r.startTime);
      const end = this.convertirHora(r.endTime);

      for (let t = new Date(start); t < end; t.setMinutes(t.getMinutes() + 15)) {
        const hora = t.getHours().toString().padStart(2, '0');
        const minutos = t.getMinutes().toString().padStart(2, '0');
        const bloque = `${hora}:${minutos}`;

        this.reservasOrganizadas[r.date][bloque] = {
          reserva: r,
          estado: r.state.toLowerCase()
        };
      }
    });
  }

  // Filtrar reservas por la fecha seleccionada
  filtrarReservasPorFecha() {
    this.reservasDelDia = this.reservas.filter(reserva =>
      reserva.date === this.fechaSeleccionada
    );
  }

  // Calcular estadísticas del día
  calcularEstadisticas() {
    this.totalReservasHoy = this.reservasDelDia.length;
    this.reservasPendientesHoy = this.reservasDelDia.filter(r => r.state === 'PENDING').length;
    this.reservasConfirmadasHoy = this.reservasDelDia.filter(r => r.state === 'CONFIRMED').length;
    this.reservasCanceladasHoy = this.reservasDelDia.filter(r => r.state === 'CANCELLED').length;
  }

  // Convertir hora string a Date
  convertirHora(hora: string): Date {
    const [h, m] = hora.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m || 0, 0, 0);
    return d;
  }

  // Obtener estado de un slot específico
  getEstadoSlot(fecha: string, horaBase: string, intervalo: string): string {
    const horaCompleta = `${horaBase.split(':')[0]}:${intervalo}`;

    // Verificar si es la hora actual
    const ahora = new Date();
    const fechaHoy = ahora.toISOString().split('T')[0];
    const horaAhora = ahora.getHours().toString().padStart(2, '0') + ':' +
      ahora.getMinutes().toString().padStart(2, '0');

    if (fecha === fechaHoy && horaCompleta === horaAhora) {
      return 'ahora';
    }

    // Verificar si hay reserva en este slot
    if (this.reservasOrganizadas[fecha] && this.reservasOrganizadas[fecha][horaCompleta]) {
      const estado = this.reservasOrganizadas[fecha][horaCompleta].estado;

      switch(estado) {
        case 'pending':
          return 'pendiente';
        case 'confirmed':
          return 'confirmada';
        case 'cancelled':
          return 'cancelada';
        default:
          return 'ocupado';
      }
    }

    return 'disponible';
  }

  // Verificar si un slot tiene reserva
  tieneReserva(fecha: string, horaBase: string, intervalo: string): boolean {
    const horaCompleta = `${horaBase.split(':')[0]}:${intervalo}`;
    return !!(this.reservasOrganizadas[fecha] && this.reservasOrganizadas[fecha][horaCompleta]);
  }

  // Obtener información para el tooltip
  getTooltipInfo(fecha: string, horaBase: string, intervalo: string): string {
    const horaCompleta = `${horaBase.split(':')[0]}:${intervalo}`;

    if (this.reservasOrganizadas[fecha] && this.reservasOrganizadas[fecha][horaCompleta]) {
      const reserva = this.reservasOrganizadas[fecha][horaCompleta].reserva;
      return `Cliente: ${reserva.clientId}\nEstado: ${reserva.state}`;
    }

    return 'Disponible';
  }

  // Obtener iniciales del cliente
  getInicialesCliente(fecha: string, horaBase: string, intervalo: string): string {
    const horaCompleta = `${horaBase.split(':')[0]}:${intervalo}`;

    if (this.reservasOrganizadas[fecha] && this.reservasOrganizadas[fecha][horaCompleta]) {
      const clienteId = this.reservasOrganizadas[fecha][horaCompleta].reserva.clientId;
      return `C${clienteId}`;
    }

    return '';
  }

  // Obtener nombre del servicio por ID
  getNombreServicio(servicioId: number): string {
    const servicio = this.servicios.find(s => s.id === servicioId);
    return servicio ? servicio.name : `Servicio ${servicioId}`;
  }

  // Calcular duración de una reserva en minutos
  calcularDuracionReserva(reserva: ReservationResponseDTO): number {
    const inicio = this.convertirHora(reserva.startTime);
    const fin = this.convertirHora(reserva.endTime);
    return (fin.getTime() - inicio.getTime()) / (1000 * 60);
  }

  // Obtener texto del estado
  getEstadoTexto(estado: string): string {
    switch(estado) {
      case 'PENDING': return 'Pendiente';
      case 'CONFIRMED': return 'Confirmada';
      case 'CANCELLED': return 'Cancelada';
      default: return estado;
    }
  }

  // Obtener nombre del día
  getNombreDia(): string {
    const fecha = new Date(this.fechaSeleccionada);
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dias[fecha.getDay()];
  }

  // Navegación de fechas
  diaAnterior() {
    const fecha = new Date(this.fechaSeleccionada);
    fecha.setDate(fecha.getDate() - 1);
    this.fechaSeleccionada = fecha.toISOString().split('T')[0];
    this.cambiarFecha();
  }

  diaSiguiente() {
    const fecha = new Date(this.fechaSeleccionada);
    fecha.setDate(fecha.getDate() + 1);
    this.fechaSeleccionada = fecha.toISOString().split('T')[0];
    this.cambiarFecha();
  }

  hoy() {
    const hoy = new Date();
    this.fechaSeleccionada = hoy.toISOString().split('T')[0];
    this.cambiarFecha();
  }

  cambiarFecha() {
    this.filtrarReservasPorFecha();
    this.calcularEstadisticas();
  }

  // Acciones sobre reservas
  verDetallesReserva(reserva: ReservationResponseDTO) {
    console.log('Ver detalles de reserva:', reserva);
    // Aquí puedes abrir un modal con más detalles
    alert(`Detalles de la reserva:\nCliente: ${reserva.clientId}\nHora: ${reserva.startTime} - ${reserva.endTime}\nEstado: ${reserva.state}`);
  }

  terminarReserva(reserva: ReservationResponseDTO) {
    if (confirm('¿Desea terminar esta reserva?')) {
      this.citaService.terminarReserva(reserva.id).subscribe({
        next: () => {
          alert('Reserva confirmada');
          this.cargarReservas(); // Recargar datos
        },
        error: (err) => {
          alert('Error al confirmar reserva');
          console.error(err);
        }
      });
    }
  }


  confirmarReserva(reserva: ReservationResponseDTO) {
    if (confirm('¿Confirmar inicio de esta reserva?')) {
      this.citaService.confirmarReserva(reserva.id).subscribe({
        next: () => {
          alert('Reserva confirmada');
          this.cargarReservas(); // Recargar datos
        },
        error: (err) => {
          alert('Error al confirmar reserva');
          console.error(err);
        }
      });
    }
  }

  cancelarReserva(reserva: ReservationResponseDTO) {
    if (confirm('¿Cancelar esta reserva?')) {
      this.citaService.cancelarReserva(reserva.id).subscribe({
        next: () => {
          alert('Reserva cancelada');
          this.cargarReservas(); // Recargar datos
        },
        error: (err) => {
          alert('Error al cancelar reserva');
          console.error(err);
        }
      });
    }
  }

  // Métodos para el resumen financiero
  calcularTotalReservasConfirmadas(): number {
    const reservasConfirmadas = this.reservasDelDia.filter(r => r.state === 'CONFIRMED');

    return reservasConfirmadas.reduce((total, reserva) => {
      return total + reserva.services.reduce((servicioTotal, servicioId) => {
        const servicio = this.servicios.find(s => s.id === servicioId);
        return servicioTotal + (servicio?.price || 0);
      }, 0);
    }, 0);
  }

  calcularHorasTrabajadas(): number {
    const reservasConfirmadas = this.reservasDelDia.filter(r => r.state === 'CONFIRMED');

    const totalMinutos = reservasConfirmadas.reduce((total, reserva) => {
      return total + this.calcularDuracionReserva(reserva);
    }, 0);

    return Math.round((totalMinutos / 60) * 10) / 10; // Redondear a 1 decimal
  }

  calcularTotalServicios(): number {
    const reservasConfirmadas = this.reservasDelDia.filter(r => r.state === 'CONFIRMED');

    return reservasConfirmadas.reduce((total, reserva) => {
      return total + reserva.services.length;
    }, 0);
  }

  // Ver detalle de un slot específico
  verDetalleReserva(fecha: string, horaBase: string, intervalo: string) {
    const horaCompleta = `${horaBase.split(':')[0]}:${intervalo}`;

    if (this.reservasOrganizadas[fecha] && this.reservasOrganizadas[fecha][horaCompleta]) {
      const reserva = this.reservasOrganizadas[fecha][horaCompleta].reserva;
      this.verDetallesReserva(reserva);
    } else {
      console.log('Slot disponible:', fecha, horaCompleta);
    }
  }
}
