import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {NewUserComponent} from "./pages/new-user/new-user.component";
import {NewBarberoComponent} from "./pages/new-barbero/new-barbero.component";
import {ReservasComponent} from "./pages/reservas/reservas.component";
import {GestionarServiciosComponent} from "./pages/admin/services/gestionar-servicios/gestionar-servicios.component";
import {CuponesComponent} from "./servicios/cupones/cupones.component";
import {OfertasComponent} from "./servicios/ofertas/ofertas.component";
import {AyudaComponent} from "./pages/ayuda/ayuda.component";
import {ActualizarServicioComponent} from "./pages/admin/services/actualizar-servicio/actualizar-servicio.component";
import {AllServicesComponent} from "./pages/all-services/all-services.component";
import {AllCortesComponent} from "./pages/all-cortes/all-cortes.component";
import {CategoryComponent} from "./pages/admin/category/category.component";
import {AdminPageComponent} from "./pages/admin/admin-page/admin-page.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/barbero', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'newUser', component: NewUserComponent },
  { path: 'admin/newBarbero', component: NewBarberoComponent },
  { path: 'reserva', component: ReservasComponent},
  { path: 'admin/gestionarServicios', component: GestionarServiciosComponent},
  { path: 'admin/actualizarServicio/:id', component: ActualizarServicioComponent },
  { path: 'admin',component: AdminPageComponent},
  { path: 'allServices', component: AllServicesComponent },
  { path: 'cortes', component: AllCortesComponent },
  { path: "category", component: CategoryComponent}
];
