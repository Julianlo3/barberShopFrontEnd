import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {NewUserComponent} from "./pages/new-user/new-user.component";
import {NewBarberoComponent} from "./pages/new-barbero/new-barbero.component";
import {ReservasComponent} from "./pages/reservas/reservas.component";
import {GestionarServiciosComponent} from "./pages/admin/gestionar-servicios/gestionar-servicios.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '/barbero', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'newUser', component: NewUserComponent },
  { path: 'newBarbero', component: NewBarberoComponent },
  { path: 'reserva', component: ReservasComponent},
  { path: 'gestionarReservas', component: GestionarServiciosComponent},
];
