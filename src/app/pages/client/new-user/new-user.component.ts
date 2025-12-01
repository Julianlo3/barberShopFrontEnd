import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {client} from "../../../logica/modelos/client";
import { NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AlertService} from "../../../logica/services/alertService";
import {ClientService} from "../../../logica/services/clientService";
import {User} from "../../../logica/modelos/user";

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    FormsModule, HttpClientModule, NgIf,
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  Client: client ={
    id:-1,
    name:'',
    phone:'',
    email:'',
    password:''
  }

  User: User = {
    name: this.Client.name,
    phone: this.Client.phone,
    email: this.Client.email,
    password: this.Client.password,
  }

  constructor(
    private clientService: ClientService,
    private alertService: AlertService){
  }

  onSubmit(form: NgForm) {
    this.User.name = this.Client.name;
    this.User.phone = this.Client.phone;
    this.User.email = this.Client.email;
    this.User.password = this.Client.password;

    console.log('Enviando client:', this.User);
    this.clientService.registerClient(this.User).subscribe({
      next: () => {
        console.log("Cliente creaddo con exito");
        this.alertService.success("Cliente creado con éxito");
        form.resetForm();
        }
      ,
      error: (err) => {
        console.error('Error al guardar cliente:', err);
        if(err.status === 409){
          this.alertService.error("Correo electrónico ya registrado. Ingrese uno diferente")
        }
        else{
          this.alertService.error("Error al guardar cliente. Contacte con el administrador.")
        }
        form.resetForm();
      }
    });
  }

}
