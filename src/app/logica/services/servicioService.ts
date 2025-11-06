import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {servicio} from "../modelos/servicio";


@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private API_URLServicio = 'http://localhost:8083/servicio';
  private API_URLCategoria = 'http://localhost:8083/categorias';

  constructor(private http: HttpClient) {}

  private EndPointPost = '/save';
  crearServicio(formData: FormData): Observable<any> {
    return this.http.post(this.API_URLServicio, formData);
  }

  private EndPointGetCate = '/getAll';
  getCategorias(): Observable<any> {
    return this.http.get(this.API_URLCategoria+this.EndPointGetCate);
  }
}

