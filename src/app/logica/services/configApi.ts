import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class configApi {
  apiURLAnder = 'http://26.147.90.88:8081/api'
  apiLocal: string = 'http://localhost:8081/api';

  public getApiURL(): string {
    return this.apiLocal;
  }
}
