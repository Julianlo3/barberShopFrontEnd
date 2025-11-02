import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Barbero} from "../modelos/barbero";


@Injectable({
  providedIn: 'root'
})
export class BarberoService {
  private API_URL = 'http://localhost:8081/barbero';

  constructor(private http: HttpClient) {}

  private EndPointPost = '/save';
  crearBarbero(barbero: Barbero): Observable<any> {
    return this.http.post(this.API_URL+this.EndPointPost, barbero);
  }
}
