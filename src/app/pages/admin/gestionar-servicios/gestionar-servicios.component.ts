import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-gestionar-servicios',
  templateUrl: './gestionar-servicios.component.html',
  standalone: true,
  styleUrls: ['./gestionar-servicios.component.css']
})
export class GestionarServiciosComponent implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const cards = Array.from(this.el.nativeElement.querySelectorAll('.accordion-card')) as HTMLElement[];

    cards.forEach((card: HTMLElement) => {
      card.addEventListener('click', () => {
        // Cierra todas las tarjetas
        cards.forEach(c => c.classList.remove('active'));
        // Activa solo la seleccionada
        card.classList.add('active');
      });
    });
  }
}

