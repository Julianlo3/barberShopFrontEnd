import { Component } from '@angular/core';
import {BarberoService} from "../../../../logica/services/barberoService";
import {BarberResponseDTO} from "../../../../logica/modelos/responseDTO/barberResponseDTO";
import {Observable} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {AlertService} from "../../../../logica/services/alertService";

@Component({
  selector: 'app-list-barbers',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './list-barbers.component.html',
  styleUrl: './list-barbers.component.css'
})
export class ListBarbersComponent {
  constructor(private barberoService: BarberoService, private alertService: AlertService) {
  }

  barbero: BarberResponseDTO = {
    id: -1,
    name: '',
    phone: '',
    email: '',
    available: false,
    schedule: {
      barberId: -1,
      startTime: '',
      endTime: '',
      workDays: []
    }
  }

  barberos: BarberResponseDTO[] = [];

  ngOnInit(){
    this.obtenerBarberos();
  }

  obtenerBarberos(){
    this.barberoService.getAllBarberos().subscribe({next: (data) =>
    {
      this.barberos = data;
    },
      error: (err) => console.error("Error obteniendo barberos")
    })

  }

  deleteBarber(name: string, id: number){
    this.alertService.confirm("Borrar cuenta de:"+name, "¿Desea borrar sus datos?. Esta opción no se puede revertir").then(result => {
        if(result){
          this.barberoService.disableBarbero(id).subscribe({
            next: value => {
              this.alertService.success("Barbero borrado");
              window.location.reload();
            },
            error: error => {
              console.error("Error al borrar los datos del barbero:", error);
              this.alertService.error("Error al borrar los datos del barbero");
            }
          })
        }
      }
    )
  }
}
