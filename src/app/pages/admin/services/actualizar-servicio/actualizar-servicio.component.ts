import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../../../../logica/services/servicioService';
import { AlertService } from '../../../../logica/services/alertService';
import { servicio } from '../../../../logica/modelos/servicio';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-servicio.component.html',
  styleUrls: ['./actualizar-servicio.component.css']
})
export class ActualizarServicioComponent {

  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;
  public categorias: any[] = [];
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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioService: ServicioService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarCategorias();
      this.cargarSubCategorias();
      this.servicioService.getServicioById(id).subscribe({
        next: (data) => {
          this.servicio = data;
          this.preview = data.imagenURL;

        },
        error: () => this.alertService.error('No se pudo cargar el servicio')
      });
    }
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



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.preview = e.target.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  cancelar(): void {
    this.router.navigate(['/admin/gestionarServicios']);
  }


  onSubmit(form: NgForm) {
    if (!this.servicio) return;

    const formData = new FormData();
    formData.append('id', this.servicio.id);
    formData.append('nombre', this.servicio.nombre);
    formData.append('descripcion', this.servicio.descripcion);
    formData.append('precio', this.servicio.precio.toString());
    formData.append('createBy', this.servicio.createBy);
    formData.append('estado', String(this.servicio.estado));
    formData.append('categoriaId', this.servicio.categoriaId);
    formData.append('subCategoriaId', this.servicio.subcategoriaId);

    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

    this.servicioService.actualizarServicio(this.servicio.id, formData).subscribe({
      next: () => {
        this.alertService.success('Servicio actualizado correctamente');
        this.router.navigate(['/gestionar-servicios']);
      },
      error: () => this.alertService.error('Error al actualizar el servicio')
    });
  }
}
