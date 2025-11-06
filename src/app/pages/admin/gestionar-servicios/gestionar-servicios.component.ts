import { Component, ElementRef, AfterViewInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {servicio} from "../../../logica/modelos/servicio";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {ServicioService} from "../../../logica/services/servicioService";
import {AlertService} from "../../../logica/services/alertService";
import {Categoria} from "../../../logica/modelos/categoria";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-gestionar-servicios',
  templateUrl: './gestionar-servicios.component.html',
  standalone: true,
  imports: [
    FormsModule,HttpClientModule,CommonModule,ReactiveFormsModule
  ],
  styleUrls: ['./gestionar-servicios.component.css']
})
export class GestionarServiciosComponent implements AfterViewInit {

  public categorias: Categoria[] = [];

  servicio: servicio = {
    nombre:'',
    descripcion:'',
    precio:0,
    createBy:"admin",
    estado:true,
    imagenURL:'',
    categoriaID:"-1"
  }

  constructor(
  private servicioService: ServicioService,
  private AlertService: AlertService,
  private el: ElementRef) {}

  ngOnInit(): void {
    this.servicioService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    );
  }

  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
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
    formData.append('categoriaID', this.servicio.categoriaID);
    formData.append('imagen', this.selectedFile);
    form.resetForm();
    this.preview = null;
    this.selectedFile = null;

    this.servicioService.crearServicio(formData).subscribe({
      next: () => this.AlertService.success("Servicio creado con éxito"),
      error: () => this.AlertService.error("Error al guardar el servicio")
    });
  }



  ngAfterViewInit(): void {
    const cards = Array.from(this.el.nativeElement.querySelectorAll('.accordion-card')) as HTMLElement[];

    cards.forEach((card: HTMLElement) => {
      card.addEventListener('click', () => {
        // Cierra todas las tarjetas
        cards.forEach(c => c.classList.remove('active'));
        // Activa solo la seleccionada
        card.classList.add('active');
      });
    });
  }
}

