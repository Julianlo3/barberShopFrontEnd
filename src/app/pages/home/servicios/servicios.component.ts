import { Component,OnInit } from '@angular/core';
import {DecimalPipe, NgOptimizedImage} from "@angular/common";
import {ServicioService} from "../../../logica/services/servicioService";
import {service} from "../../../logica/modelos/servicio";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [
    DecimalPipe,
    CommonModule,
  ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  serviciosLimitados: service[] = [];

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {

  }
}
