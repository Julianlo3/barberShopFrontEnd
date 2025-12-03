import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserLogin} from "../../logica/modelos/userLogin";
import {FormsModule,NgForm} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ClientService} from "../../logica/services/clientService";
import {AlertService} from "../../logica/services/alertService";
import {StorageService} from "../../logica/services/storage-service.service"
import { Router } from '@angular/router';
import {AuthService} from "../../logica/services/authService";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private clientService: ClientService,
              private storageService: StorageService,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertService) {
  }

  user: UserLogin= {
    email: '',
    password: ''
  }

  hasRole(role: string): boolean {
    return this.storageService.hasRole(role);
  }

  onSubmit(form: NgForm){
    this.authService.login(this.user.email,this.user.password).subscribe({
      next: (data) => {

        this.storageService.saveUser(data);
        console.log('Login exitoso');
        this.alertService.success("Login exitoso");
        const roles = this.storageService.getUser().roles;
        console.log("Rol del usuario: " + roles + "");

        switch (roles[0]) {
          case 'ROLE_CLIENT': this.router.navigate(['/home']); break;
          case 'ROLE_BARBER': this.router.navigate(['/barber/myDay']); break;
          case 'ROLE_ADMIN': this.router.navigate(['/admin']); break;
          default: this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
