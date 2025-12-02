import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {cita} from "../modelos/cita";
import {configApi} from "../services/configApi";

@Injectable({
  providedIn: 'root'
})
export class citaService {
  constructor(private http: HttpClient,private configApi: configApi) {}

  private EndPointPost = '/save';
  crearCita(Cita: cita): Observable<any> {
    return this.http.post(this.configApi.getApiURL(), Cita);
  }
}
