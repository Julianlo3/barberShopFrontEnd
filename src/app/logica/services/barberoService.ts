import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {configApi} from "../services/configApi";
import {BarberRequestDTO} from "../modelos/requestDTO/barberRequestDTO";
import {StorageService} from "./storage-service.service";


@Injectable({
  providedIn: 'root'
})
export class BarberoService {
  private API_URL = 'http://localhost:8081/barbero';

  constructor(private http: HttpClient,private storageService: StorageService,private configApi: configApi) {}

  crearBarbero(barbero: BarberRequestDTO): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.post(this.configApi.getApiURL()+"/auth/signup/barber", barbero,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }
}

