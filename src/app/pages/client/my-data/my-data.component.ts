import { Component } from '@angular/core';
import {client} from "../../../logica/modelos/client";
import {ClientService} from "../../../logica/services/clientService";
import {FormsModule, ReactiveFormsModule,NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {StorageService} from "../../../logica/services/storage-service.service";
import {ClientResponseDTO} from "../../../logica/modelos/responseDTO/clientResponseDTO";
import {AlertService} from "../../../logica/services/alertService";
import {ClientRequestDTO} from "../../../logica/modelos/requestDTO/clientRequestDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-data',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './my-data.component.html',
  styleUrl: './my-data.component.css'
})
export class MyDataComponent {

  constructor(private clientService: ClientService, private storageService: StorageService,private alertService: AlertService,
              private router: Router) {
  }

  editable: boolean = false;

  Client: ClientResponseDTO = {
    id: -1,
    name: '',
    phone: '',
    email: '',
    available: false
  }

  ClientActualizado: ClientRequestDTO ={
    name: '',
    phone: '',
    email: ''
  }

  ngOnInit(): void {
    this.cargarDatos();

  }

  onSubmit(form: NgForm) {

  }

  cargarDatos() {
    const user = this.storageService.getUser();

    if (!user || !user.email) {
      console.error("No hay usuario en sessionStorage");
      return;
    }

    this.clientService.getClientByEmail(user.email).subscribe({
      next: (data) => {
        console.log(data); this.Client = data;

        },
      error: (error) => console.error("Error al obtener datos del cliente:", error)
    });
  }

  activarEdicion() {
    this.editable = true;
  }

  desactivarEdicion() {
    this.editable = false;
  }

  actualizarDatos(form: NgForm) {
    this.alertService.confirm("Actualizar Datos", "¿Desea actualizar sus datos?").then(result => {
        if(result){
          this.ClientActualizado.name = this.Client.name;
          this.ClientActualizado.phone = this.Client.phone;
          this.ClientActualizado.email = this.Client.email;

          const user = this.storageService.getUser();

          this.clientService.updateClient(user.id,this.ClientActualizado).subscribe({
            next: value => {
              this.alertService.success("Datos actualizados correctamente");
            },
            error: error => {
              console.error("Error al actualizar datos:", error);
              this.alertService.error("Error al actualizar datos");
            }
          })
        }
      }
    )
  }

  disableClient() {
    this.alertService.confirm("Borrar cuenta", "¿Desea borrar sus datos?. Esta opción no se puede revertir").then(result => {
        if(result){
          const user = this.storageService.getUser();
          this.clientService.disableClient(this.Client.id).subscribe({
            next: value => {
              this.alertService.success("Cuenta borrada");
              this.storageService.clean()
              this.router.navigate(['/home'])
            },
            error: error => {
              console.error("Error al borrar datos:", error);
              this.alertService.error("Error al actualizar datos");
            }
          })
        }
      }
    )
  }

}
