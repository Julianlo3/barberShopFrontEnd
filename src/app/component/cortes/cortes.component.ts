import { Component,OnInit } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ServicioService} from "../../logica/services/servicioService";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-cortes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './cortes.component.html',
  styleUrl: './cortes.component.css'
})

export class CortesComponent implements OnInit{
  Cortes: any[] = []; // Aquí se guardarán las categorías
  CorteSeleccionado: string = ''; // Para manejar la selección

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargarCortes();
  }

  cargarCortes(): void {
    this.servicioService.getServiciosByCategoriaId("1").subscribe({
      next: (data) => {
        this.Cortes = data.slice(0, 3);
      },
      error: (err) => {
        console.error('Error al obtener cortes:');
      }
    });
  }

  seleccionarCorte(nombre: string) {
    this.CorteSeleccionado = nombre;
    console.log('Corte seleccionada:', nombre);
  }
}
