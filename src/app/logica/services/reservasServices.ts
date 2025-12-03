import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {cita} from "../modelos/cita";
import {configApi} from "../services/configApi";
import {ReservationRequestDTO} from "../modelos/requestDTO/ReservationRequestDTO";
import {StorageService} from "./storage-service.service";

@Injectable({
  providedIn: 'root'
})
export class citaService {
  constructor(private http: HttpClient,private configApi: configApi,private storageService: StorageService) {}

  crearCita(reservation: ReservationRequestDTO): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.post(this.configApi.getApiURL()+"/reservation", reservation,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  getReservationsByBarberId(barberId: number): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.get(`${this.configApi.getApiURL()}/reservation/barber/${barberId}`, {
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    })
  }

  confirmarReserva(id: number): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.put(`${this.configApi.getApiURL()}/reservation/start/${id}`,null,{
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    })
  }

  terminarReserva(id: number): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.put(`${this.configApi.getApiURL()}/reservation/finish/${id}`,null,{
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    })
  }



  cancelarReserva(id: number): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.put(`${this.configApi.getApiURL()}/reservation/cancel/${id}`,null,{
      headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
    })
  }


}
