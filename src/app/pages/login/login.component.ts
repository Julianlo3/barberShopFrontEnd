import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserLogin} from "../../logica/modelos/userLogin";
import {FormsModule,NgForm} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ClientService} from "../../logica/services/clientService";
import {AlertService} from "../../logica/services/alertService";
import {StorageService} from "../../logica/services/storage-service.service"
import { Router } from '@angular/router';


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
              private alertService: AlertService,
              private storageService: StorageService,
              private router: Router) {
  }

  user: UserLogin= {
    email: '',
    password: ''
  }

  onSubmit(form: NgForm){
    this.clientService.login(this.user.email,this.user.password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);
        console.log('Login exitoso');
        this.alertService.success("Login exitoso");
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
