import { Component } from '@angular/core';
import {EnConstruccionComponent} from "../../component/en-construccion/en-construccion.component";

@Component({
  selector: 'app-ayuda',
  standalone: true,
    imports: [
        EnConstruccionComponent
    ],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {

}
