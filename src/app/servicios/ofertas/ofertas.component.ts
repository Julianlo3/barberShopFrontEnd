import { Component } from '@angular/core';
import {EnConstruccionComponent} from "../../en-construccion/en-construccion.component";

@Component({
  selector: 'app-ofertas',
  standalone: true,
    imports: [
        EnConstruccionComponent
    ],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {

}
