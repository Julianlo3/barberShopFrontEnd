import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf,NgForOf} from "@angular/common";

import {AlertService} from "../../../logica/services/alertService";
import {HttpClientModule} from "@angular/common/http";
import {CategoryRequestDTO} from "../../../logica/modelos/requestDTO/categoryRequestDTO";
import {CategoryResponseDTO} from "../../../logica/modelos/responseDTO/categoryResponseDTO";
import {ServicioService} from "../../../logica/services/servicioService";

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
  Categories: CategoryResponseDTO[] = [];

categoryRequest: CategoryRequestDTO ={
  name:'',
}

categoryResponse: CategoryResponseDTO = {
  id:-1,
  name:''
}

constructor(
  private servicioService: ServicioService,
  private AlertService: AlertService,
) {
}

  onSubmit(){
  this.servicioService.crearCategory(this.categoryRequest).subscribe({
    next:() => {
      this.AlertService.success("Categoria creada con exito")
      this.cargarCategories();
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
    this.servicioService.getCategories().subscribe({
      next: (data) => {
        this.Categories = data;
      },
      error: (err) => {
        console.error('Error al obtener categorias:', err);
      }
    });
  }

  deleteCategory(name: String,id: number){
    this.AlertService.confirm("Eliminar categoria:"+name,"¿Desea eliminar la categoria seleccionada?").then(result => {
      if (result){
        console.log("Eliminando categoria con id:", id);
      }
    })

  }

}
