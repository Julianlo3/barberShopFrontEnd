import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from "@angular/forms";
import { servicio } from "../../../logica/modelos/servicio";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { ServicioService } from "../../../logica/services/servicioService";
import { AlertService } from "../../../logica/services/alertService";
import { Categoria } from "../../../logica/modelos/categoria";
import { Router } from "@angular/router";
import {SubCategoria} from "../../../logica/modelos/subCategoria";

@Component({
  selector: 'app-gestionar-servicios',
  templateUrl: './gestionar-servicios.component.html',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, ReactiveFormsModule],
  styleUrls: ['./gestionar-servicios.component.css']
})
export class GestionarServiciosComponent implements AfterViewInit, OnInit {

  public categorias: any[] = [];
  public servicios: servicio[] = [];
  public mostrarInput = false;

  public subcategorias: any[] = [];

  servicio: servicio = {
    id:'',
    nombre: '',
    descripcion: '',
    precio: 0,
    createBy: "admin",
    estado: true,
    imagenURL: '',
    categoriaId: "-1",
    subcategoriaId: '-1'
  };

  subcategoria: SubCategoria={
    id:-1,
    nombre:'',
  }

  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;

  constructor(
    private servicioService: ServicioService,
    private AlertService: AlertService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarServicios();
    this.cargarSubCategorias();
  }

  cargarCategorias() {
    this.servicioService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    );
  }

  cargarSubCategorias(){
    this.servicioService.getSubCategorias().subscribe(
      subcategorias => this.subcategorias = subcategorias
    );
  }

  cargarServicios() {
    this.servicioService.getServicios().subscribe(
      servicios => this.servicios = servicios
    );
  }

  onChangeSubcategoria() {
    if (this.servicio.subcategoriaId === 'nuevo') {
      this.mostrarInput = true;
      this.servicio.subcategoriaId = '';
    }
  }

  cancelarNuevaSub() {
    this.mostrarInput = false;
    this.servicio.subcategoriaId = '';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.preview = e.target.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(form: NgForm) {
    if (!this.selectedFile) {
      this.AlertService.error("Debes seleccionar una imagen");
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.servicio.nombre);
    formData.append('descripcion', this.servicio.descripcion);
    formData.append('precio', this.servicio.precio.toString());
    formData.append('createBy', this.servicio.createBy);
    formData.append('estado', String(this.servicio.estado));
    formData.append('categoriaId', this.servicio.categoriaId);
    formData.append('subCategoriaId', this.servicio.subcategoriaId);
    formData.append('imagen', this.selectedFile);

    this.servicioService.crearServicio(formData).subscribe({
      next: () => {
        this.AlertService.success("Servicio creado con éxito");
        this.cargarServicios();
        form.resetForm();
        this.preview = null;
        this.selectedFile = null;
      },
      error: () => this.AlertService.error("Error al guardar el servicio")
    });
  }

  ngAfterViewInit(): void {
    const cards = Array.from(this.el.nativeElement.querySelectorAll('.accordion-card')) as HTMLElement[];

    cards.forEach((card: HTMLElement) => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
  }

  editarServicio(id: string) {
    this.router.navigate(['admin/actualizarServicio/', id]);
  }

  eliminarServicio(id: string) {
    if (confirm("¿Seguro que deseas eliminar este servicio?")) {
      this.servicioService.eliminarServicio(id).subscribe({
        next: () => {
          this.AlertService.success("Servicio eliminado correctamente");
          this.cargarServicios();
        },
        error: () => this.AlertService.error("Servicio eliminado correctamente")
      });
    }
  }

}
