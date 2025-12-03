import { Component } from '@angular/core';
import {CommonModule, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {ServicioService} from "../../../logica/services/servicioService";
import {HttpClientModule} from "@angular/common/http";
import {service} from "../../../logica/modelos/servicio";
import {ServicesResponseDTO} from "../../../logica/modelos/responseDTO/servicesResponseDTO";


@Component({
  selector: 'app-all-services',
  standalone: true,
    imports: [
        DecimalPipe,
        NgForOf,
        NgIf,
      HttpClientModule,
      CommonModule
    ],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.css'
})
export class AllServicesComponent {

  categorias: any[] = []; // Aquí se guardarán las categorías
  categoriaSeleccionada: string = ''; // Para manejar la selección
  public servicios: ServicesResponseDTO[] = [];

  servicio: ServicesResponseDTO = {
    id:-1,
    name: "",
    description: "",
    price: 0,
    duration: 0,
    available: false,
    category: "",
  };

  constructor(
    private servicioService: ServicioService){}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarServicios();
  }

  cargarCategorias() {
    this.servicioService.getCategories().subscribe(
      categorias => this.categorias = categorias
    );
  }

  cargarServicios() {
    this.servicioService.getServicios().subscribe(
      servicios => this.servicios = servicios
    )
  }

  seleccionarCategoria(id: string) {
    this.servicios = [];
    this.categoriaSeleccionada = id;
    console.log("id seleccionado: "+id);
    this.servicioService.getServiciosByCategory(id).subscribe(
      servicios => {this.servicios = servicios; console.log("longitud de servicios: "+servicios.length);}
    );
    console.log(this.servicios);
  }

  quitarFiltro() {
    this.categoriaSeleccionada = '';
    this.cargarServicios();
  }

}
