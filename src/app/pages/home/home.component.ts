import { Component } from '@angular/core';
import {CortesComponent} from "../../component/cortes/cortes.component";
import {ServiciosComponent} from "../../component/servicios/servicios.component";
import {ReservasComponent} from "../../component/reservas/reservas.component";
import {NuestrosBarberosComponent} from "../../component/nuestros-barberos/nuestros-barberos.component";

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
