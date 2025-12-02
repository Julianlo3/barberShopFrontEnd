import { Component,OnInit } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ServicioService} from "../../../logica/services/servicioService";
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

  }

  seleccionarCorte(nombre: string) {
    this.CorteSeleccionado = nombre;
    console.log('Corte seleccionada:', nombre);
  }
}
