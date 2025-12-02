import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../services/storage-service.service";
import {configApi} from "../services/configApi";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
              private storageService: StorageService,
              private configApi: configApi) {}

  registerClient(request: any): Observable<any> {
    return this.http.post(`${this.configApi.getApiURL()}/auth/signup/client`, request, httpOptions);
  }

  getClientByEmail(email: string): Observable<any> {
    const token = this.storageService.getToken();

    return this.http.get(`${this.configApi.getApiURL()}/client/email`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }),
      params: { email }
    });
  }

  updateClient(id: any, client: any): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.put(`${this.configApi.getApiURL()}/auth/update/${id}`, client, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  disableClient(id: any): Observable<any> {
    const token = this.storageService.getToken();
    return this.http.put(`${this.configApi.getApiURL()}/client/disable/${id}`,null, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }



}
