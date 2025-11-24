import { Component,OnInit } from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from "@angular/common";
import {ServicioService} from "../../logica/services/servicioService";
import {servicio} from "../../logica/modelos/servicio";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DecimalPipe,
    CommonModule,
  ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  serviciosLimitados: servicio[] = [];

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.servicioService.getServiciosByCategoriaId("2").subscribe(servicios => {
      // solo los 3 primeros
      this.serviciosLimitados = servicios.slice(0, 3);
    });
  }
}
