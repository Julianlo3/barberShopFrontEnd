import { Component } from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {ServicioService} from "../../logica/services/servicioService";

@Component({
  selector: 'app-all-cortes',
  standalone: true,
    imports: [
        DecimalPipe,
        NgForOf,
        NgIf
    ],
  templateUrl: './all-cortes.component.html',
  styleUrl: './all-cortes.component.css'
})
export class AllCortesComponent {

  Cortes: any[] = []; // Aquí se guardarán las categorías
  CorteSeleccionado: string = ''; // Para manejar la selección

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargarCortes();
  }

  cargarCortes(): void {
    this.servicioService.getServiciosByCategoriaId("1").subscribe({
      next: (data) => {
        this.Cortes = data;
      },
      error: (err) => {
        console.error('Error al obtener cortes:', err);
      }
    });
  }

  seleccionarCorte(nombre: string) {
    this.CorteSeleccionado = nombre;
    console.log('Corte seleccionada:', nombre);
  }

}
