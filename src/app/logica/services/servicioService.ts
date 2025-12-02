import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {service} from "../modelos/servicio";
import {configApi} from "../services/configApi";
import {CategoryRequestDTO} from "../modelos/requestDTO/categoryRequestDTO";
import {CategoryResponseDTO} from "../modelos/responseDTO/categoryResponseDTO";
import {ServiceRequestDTO} from "../modelos/requestDTO/serviceRequestDTO";
import {StorageService} from "./storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient,private configApi: configApi,private storageService: StorageService) {}

  crearCategory(category: CategoryRequestDTO): Observable<any> {
    return this.http.post(this.configApi.getApiURL()+'/service/category', category);
  }

  getCategories(): Observable<CategoryResponseDTO[]> {
    return this.http.get<CategoryResponseDTO[]>(this.configApi.getApiURL()+'/service/category');
  }

  //Servicios
  crearServicio(servicio: ServiceRequestDTO): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.post(this.configApi.getApiURL()+'/service',servicio,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  getServicioById(id: string): Observable<any> {
    return this.http.get(this.configApi.getApiURL() + '/' + id);
  }

  actualizarServicio(id: string,formData: FormData): Observable<any> {
    return this.http.put(this.configApi.getApiURL() + "/"+id, formData);
  }

  eliminarServicio(id: string): Observable<any> {
    return this.http.delete(this.configApi.getApiURL()+"/"+id);
  }

  getServicios(): Observable<any> {
    return this.http.get(this.configApi.getApiURL()+"/service");
  }




}

