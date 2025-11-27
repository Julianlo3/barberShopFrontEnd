import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {NewUserComponent} from "./pages/client/new-user/new-user.component";
import {NewBarberoComponent} from "./pages/admin/new-barbero/new-barbero.component";
import {ReservasComponent} from "./pages/client/reservas/reservas.component";
import {AllServicesComponent} from "./pages/client/all-services/all-services.component";
import {CategoryComponent} from "./pages/admin/category/category.component";
import {AdminPageComponent} from "./pages/admin/admin-page/admin-page.component";
import {UpdateServiceComponent} from "./pages/admin/services/update-service/update-service.component";
import {ListBarbersComponent} from "./pages/admin/list-barbers/list-barbers.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/barbero', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'newUser', component: NewUserComponent },
  { path: 'admin/newBarbero', component: NewBarberoComponent },
  { path: 'reserva', component: ReservasComponent},
  { path: 'service/new', component: NewBarberoComponent},
  { path: 'service/update/:id', component: UpdateServiceComponent},
  { path: 'service/list', component: AllServicesComponent },
  { path: 'admin',component: AdminPageComponent},
  { path: "admin/category", component: CategoryComponent},
  { path: "admin/listBarber", component: ListBarbersComponent}
];
