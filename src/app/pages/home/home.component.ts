import { Component } from '@angular/core';
import {CortesComponent} from "./cortes/cortes.component";
import {ServiciosComponent} from "./servicios/servicios.component";
import {ReservasComponent} from "./reservas/reservas.component";
import {NuestrosBarberosComponent} from "./nuestros-barberos/nuestros-barberos.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CortesComponent,
    ServiciosComponent,
    ReservasComponent,
    NuestrosBarberosComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
