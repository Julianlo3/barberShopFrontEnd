import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ServicioService} from "../../../../logica/services/servicioService";
import {AlertService} from "../../../../logica/services/alertService";
import {service} from "../../../../logica/modelos/servicio";
import {CategoryResponseDTO} from "../../../../logica/modelos/responseDTO/categoryResponseDTO";
import {ServicesResponseDTO} from "../../../../logica/modelos/responseDTO/servicesResponseDTO";

@Component({
  selector: 'app-update-service',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './update-service.component.html',
  styleUrl: './update-service.component.css'
})
export class UpdateServiceComponent {

  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;
  public categorias: CategoryResponseDTO[] = [];

  servicioResponse: ServicesResponseDTO = {
    id: -1,
    name:'',
    description: '',
    price: -1,
    duration: -1,
    available: false,
    category: '',
  }


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
      this.servicioService.getServicioById(id).subscribe({
        next: (data) => {
          this.servicioResponse = data;
          this.preview = data.imagenURL;

        },
        error: () => this.alertService.error('No se pudo cargar el servicio')
      });
    }
  }
  cargarCategorias() {
    this.servicioService.getCategories().subscribe(
      categorias => this.categorias = categorias
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
    if (!this.selectedFile) {
      this.alertService.error("Debes seleccionar una imagen");
      return;
    }

    // const formData = new FormData();
    // formData.append('name', this.servicio.name);
    // formData.append('description', this.servicio.desciption);
    // formData.append('duration', this.servicio.duration.toString());
    // formData.append('category', this.servicio.category);
    // formData.append('available', String(this.servicio.available));
    // formData.append('imagenURL', this.selectedFile);

    this.servicioService.crearServicio(this.servicioResponse).subscribe({
      next: () => {
        this.alertService.success("Servicio creado con éxito");
        form.resetForm();
        this.preview = null;
        this.selectedFile = null;
      },
      error: () => this.alertService.error("Error al guardar el servicio")
    });
  }

}
