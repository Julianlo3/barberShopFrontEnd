import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {configApi} from "../services/configApi";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, private configApi: configApi) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.configApi.getApiURL()}/auth/signin`, { email, password }, httpOptions);
  }

}
