import { Component } from '@angular/core';
import {EnConstruccionComponent} from "../../component/en-construccion/en-construccion.component";

@Component({
  selector: 'app-cupones',
  standalone: true,
  imports: [
    EnConstruccionComponent
  ],
  templateUrl: './cupones.component.html',
  styleUrl: './cupones.component.css'
})
export class CuponesComponent {

}
