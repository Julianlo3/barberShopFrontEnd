import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Category} from "../modelos/categoria";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private API_URL = 'http://localhost:8083/api/categorias';

  constructor(private http: HttpClient) {
  }

  crearCategory(category: Category): Observable<any> {
    return this.http.post(this.API_URL, category);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL);
  }
}
