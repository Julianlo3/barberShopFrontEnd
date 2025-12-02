import { Component } from '@angular/core';
import {CommonModule, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {ServicioService} from "../../../logica/services/servicioService";
import {HttpClientModule} from "@angular/common/http";
import {service} from "../../../logica/modelos/servicio";


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
  public servicios: service[] = [];

  servicio: service = {
    id:-1,
    name: "",
    desciption: "",
    duration: 0,
    category: "",
    price: 0,
    available: false,
    imagenURL: "",
    categoryID:-1
  };

  constructor(
    private servicioService: ServicioService){}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarServicios("1");
  }

  cargarCategorias() {
    this.servicioService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    );
  }

  cargarServicios(id: string) {
    this.servicioService.getServiciosByCategoriaId(id).subscribe(
      servicios => this.servicios = servicios
    );
  }

  seleccionarCategoria(id: string) {
    this.categoriaSeleccionada = id;
    console.log('Categoría seleccionada:', id);
    this.cargarServicios(id);
  }

}
