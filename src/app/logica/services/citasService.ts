import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {cita} from "../modelos/cita";

@Injectable({
  providedIn: 'root'
})
export class citaService {
  private API_URL = 'http://localhost:8083/cita';

  constructor(private http: HttpClient) {}

  private EndPointPost = '/save';
  crearCita(Cita: cita): Observable<any> {
    return this.http.post(this.API_URL+this.EndPointPost, Cita);
  }
}
