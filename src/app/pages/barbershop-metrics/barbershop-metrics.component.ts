import { Component } from '@angular/core';
import {NgChartsModule} from "ng2-charts";
import {AfterViewInit} from "@angular/core";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-barbershop-metrics',
  standalone: true,
  imports: [
    NgChartsModule
  ],
  templateUrl: './barbershop-metrics.component.html',
  styleUrl: './barbershop-metrics.component.css'
})
export class BarbershopMetricsComponent implements AfterViewInit{


  ngAfterViewInit() {
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Corte', 'Barba', 'Cejas', 'Tinte'],
        datasets: [
          {
            label: 'Servicios vendidos',
            data: [25, 15, 8, 12],
            backgroundColor: [
              '#c59d5f',
              '#8d6e63',
              '#4e342e',
              '#ffb74d'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });

    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Cortes', 'Barbas', 'Cejas'],
        datasets: [
          {
            data: [40, 25, 10],
            backgroundColor: ['#c59d5f', '#d2691e', '#3e2723']
          }
        ]
      }
    });

  }
  


}
