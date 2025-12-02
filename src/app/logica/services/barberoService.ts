import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {configApi} from "../services/configApi";
import {BarberRequestDTO} from "../modelos/requestDTO/barberRequestDTO";
import {StorageService} from "./storage-service.service";
import {BarberResponseDTO} from "../modelos/responseDTO/barberResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class BarberoService {

  constructor(private http: HttpClient,private storageService: StorageService,private configApi: configApi) {}

  crearBarbero(barbero: BarberRequestDTO): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.post(this.configApi.getApiURL()+"/auth/signup/barber", barbero,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  getAllBarberos(): Observable<BarberResponseDTO[]> {
    const token = this.storageService.getToken();
    return this.http.get<BarberResponseDTO[]>(this.configApi.getApiURL()+"/barber",{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  getBarberoByEmail(email: string): Observable<BarberResponseDTO>{
    const token = this.storageService.getToken();
    return this.http.get<BarberResponseDTO>(this.configApi.getApiURL()+"/barber/email", {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      params: {email}
    });
  }

  updateBarbero(id: number,barbero: BarberRequestDTO): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.put(this.configApi.getApiURL()+"/barber/email/"+id, barbero,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })});
  }

  disableBarbero(id: number): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.put(`${this.configApi.getApiURL()}/barber/disable/${id}`,null, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

}

