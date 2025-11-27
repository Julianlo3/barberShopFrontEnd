import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-myday',
  standalone: true,
  imports: [
    NgClass,
    CommonModule
  ],
  templateUrl: './myday.component.html',
  styleUrl: './myday.component.css'
})
export class MydayComponent {

  getSegmentLabel(i: number): string {
    const labels = ["00", "15", "30", "45"];
    return labels[i] ?? "";
  }


  horas = [
    {
      label: "9 AM",
      slots: [
        { estado: "disponible" },

        { estado: "disponible" },

        {
          estado: "ocupado",
          cliente: "Carlos",
          servicios: ["Corte", "Barba"]
        },

        {
          estado: "ocupado",
          cliente: "Sandra",
          servicios: ["Tinte"]
        }
      ]
    }
  ];


}
