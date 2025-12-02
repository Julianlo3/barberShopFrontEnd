import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../services/storage-service.service";

const API_GATEWAY_AUT = 'http://localhost:8081/api/auth';
const API_GATEWAY_CLIENT = 'http://localhost:8081/api/client';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
              private storageService: StorageService) {}

  registerClient(request: any): Observable<any> {
    return this.http.post(`${API_GATEWAY_AUT}/signup/client`, request, httpOptions);
  }

  getClientByEmail(email: string): Observable<any> {
    const token = this.storageService.getToken();

    return this.http.get(`${API_GATEWAY_CLIENT}/email`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      params: { email }
    });
  }

  updateClient(id: any, client: any): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.put(`${API_GATEWAY_AUT}/update/${id}`, client, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  disableClient(id: any): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.put(`${API_GATEWAY_CLIENT}/disable/${id}`,null, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }



}
