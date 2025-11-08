import { Component } from '@angular/core';
import {CommonModule, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {Categoria} from "../../logica/modelos/categoria";
import {ServicioService} from "../../logica/services/servicioService";
import {HttpClientModule} from "@angular/common/http";
import {servicio} from "../../logica/modelos/servicio";


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
  public servicios: servicio[] = [];

  servicio: servicio = {
    id:'',
    nombre: '',
    descripcion: '',
    precio: 0,
    createBy: "admin",
    estado: true,
    imagenURL: '',
    categoriaId: "-1",
    subcategoriaId: '1'
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
