import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ServicioService} from "../../../../logica/services/servicioService";
import {Router, RouterLink} from "@angular/router";
import {service} from "../../../../logica/modelos/servicio";
import {AlertService} from "../../../../logica/services/alertService";

@Component({
  selector: 'app-new-service',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.css'
})
export class NewServiceComponent implements AfterViewInit{

  public categorias: any[] = [];
  public servicios: service[] = [];
  public categoryDisponibility: boolean = false;

  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;

  servicio: service = {
    id: -1,
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
    private servicioService: ServicioService,
    private AlertService: AlertService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    console.log("estado de disponibilidad de categorias: ", this.categoryDisponibility);
  }

  cargarCategorias() {
    this.servicioService.getCategorias().subscribe({
      next: (categorias) =>{
        this.categoryDisponibility = true;
        this.categorias = categorias
      },
      error: () => console.error('Error al obtener categorias:')
    })
  }

  cargarServicios() {
    this.servicioService.getServicios().subscribe(
      servicios => this.servicios = servicios
    );
  }

  onSubmit(form: NgForm) {
    if (!this.selectedFile) {
      this.AlertService.error("Debes seleccionar una imagen");
      return;
    }

    const formData = new FormData();
    formData.append('name', this.servicio.name);
    formData.append('description', this.servicio.desciption);
    formData.append('duration', this.servicio.duration.toString());
    formData.append('category', this.servicio.category);
    formData.append('available', String(this.servicio.available));
    formData.append('imagenURL', this.selectedFile);

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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.preview = e.target.result;
      reader.readAsDataURL(this.selectedFile);
    }
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
