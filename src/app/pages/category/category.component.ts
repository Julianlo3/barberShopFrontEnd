import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf,NgForOf} from "@angular/common";
import {Category} from "../../logica/modelos/categoria";
import {CategoryService} from "../../logica/services/categoryService";
import {AlertService} from "../../logica/services/alertService";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-category',
  standalone: true,
    imports: [
        FormsModule,
      NgIf,
        ReactiveFormsModule,
      HttpClientModule,
      NgForOf
    ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  Categories: any[] = [];

category: Category ={
  nombre:'',
  createdBy: "admin"
}

constructor(
  private categoriaService: CategoryService,
  private AlertService: AlertService,
) {
}

  onSubmit(){
  this.categoriaService.crearCategory(this.category).subscribe({
    next:() => {
      this.AlertService.success("Categoria creada con exito")
    },
    error: () => this.AlertService.error("Error al crear categoria")
  })
}

  activeCard: number = 1;

  toggleCard(card: number) {
    this.activeCard = this.activeCard === card ? 0 : card;
  }

  ngOnInit(): void {
    this.cargarCategories();
  }

  cargarCategories(){
    this.categoriaService.getCategories().subscribe({
      next: (data) => {
        this.Categories = data;
      },
      error: (err) => {
        console.error('Error al obtener categorias:', err);
      }
    });
  }

}
