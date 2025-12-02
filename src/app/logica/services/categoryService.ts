import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {configApi} from "./configApi";
import {CategoryRequestDTO} from "../modelos/requestDTO/categoryRequestDTO";
import {CategoryResponseDTO} from "../modelos/responseDTO/categoryResponseDTO";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient,private configApi: configApi) {
  }

  crearCategory(category: CategoryRequestDTO): Observable<any> {
    return this.http.post(this.configApi.getApiURL(), category);
  }

  getCategories(): Observable<CategoryResponseDTO[]> {
    return this.http.get<CategoryResponseDTO[]>(this.configApi.getApiURL());
  }
}
