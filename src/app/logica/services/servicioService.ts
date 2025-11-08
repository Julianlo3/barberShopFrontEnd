import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {servicio} from "../modelos/servicio";


@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private API_URLServicio = 'http://localhost:8083/api/servicios';
  private API_URLCategoria = 'http://localhost:8083/api/categorias';
  private API_URLSubCategoria = 'http://localhost:8083/api/subcategorias';

  constructor(private http: HttpClient) {}

  //Servicios
  crearServicio(formData: FormData): Observable<any> {
    return this.http.post(this.API_URLServicio, formData);
  }

  getServicioById(id: string): Observable<any> {
    return this.http.get(this.API_URLServicio + '/' + id);
  }

  actualizarServicio(id: string,formData: FormData): Observable<any> {
    return this.http.put(this.API_URLServicio + "/"+id, formData);
  }

  eliminarServicio(id: string): Observable<any> {
    return this.http.delete(this.API_URLServicio+"/"+id);
  }

  getServicios(): Observable<any> {
    return this.http.get(this.API_URLServicio);
  }

  //Categorias
  getCategorias(): Observable<any> {
    return this.http.get(this.API_URLCategoria);
  }

  getServiciosByCategoriaId(id: string): Observable<any> {
    return this.http.get(this.API_URLServicio + '/categoria/' + id);
  }

  //subCategorias
  getSubCategorias(): Observable<any> {
    return this.http.get(this.API_URLSubCategoria);
  }

  getSubCategoriaById(id: string): Observable<any> {
    return this.http.get(this.API_URLSubCategoria + '/'+ id);
  }



}

