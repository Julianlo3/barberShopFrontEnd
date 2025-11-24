import { Component } from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Category} from "../../logica/modelos/categoria";

@Component({
  selector: 'app-category',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  Categories: Category[] = [];
category: Category ={
  name:''
}

  activeCard: number = 1;

  toggleCard(card: number) {
    this.activeCard = this.activeCard === card ? 0 : card;
  }



}
