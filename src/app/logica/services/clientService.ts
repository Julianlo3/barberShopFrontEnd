import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {client} from "../modelos/client";
import {apiGateWay} from "./apiGateWay";

const API_GATEWAY = 'http://localhost:8081/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {}

  registerClient(request: any): Observable<any> {
    return this.http.post(`${API_GATEWAY}/signup/client`, request, httpOptions);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${API_GATEWAY}/signin`, { email, password }, httpOptions);
  }

}
