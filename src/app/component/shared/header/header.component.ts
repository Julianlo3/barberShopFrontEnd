import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NavComponent} from "../nav/nav.component";
import {RouterLink} from "@angular/router";
import {StorageService} from "../../../logica/services/storage-service.service";
import {AlertService} from "../../../logica/services/alertService";
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavComponent,
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private storageService: StorageService, private alertService: AlertService,
              private router: Router) { }

  comprobarToken(){
    return this.storageService.isLogged();
  }

  obtenerInfoUsuario(){
    return this.storageService.getUser();
  }

  cerrarSesion(){
    this.alertService.confirm("Cerrar sesión", "¿Desea cerrar sesión?").then(result => {
      if(result){
        this.storageService.clean()
        this.router.navigate(['/home'])
      }
    }
      )
  }

}
