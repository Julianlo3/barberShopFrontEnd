import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {client} from "../modelos/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private API_URL = 'http://localhost:8082/client';

  constructor(private http: HttpClient) {}

  private EndPointPost = '/save';
  crearClient(Client: client): Observable<any> {
    return this.http.post(this.API_URL+this.EndPointPost, Client);
  }
}
