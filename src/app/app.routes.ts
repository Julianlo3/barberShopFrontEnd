import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {NewUserComponent} from "./pages/client/new-user/new-user.component";
import {NewBarberoComponent} from "./pages/admin/barber/new-barbero/new-barbero.component";
import {ReservasComponent} from "./pages/client/reservas/reservas.component";
import {AllServicesComponent} from "./pages/client/all-services/all-services.component";
import {CategoryComponent} from "./pages/admin/category/category.component";
import {AdminPageComponent} from "./pages/admin/admin-page/admin-page.component";
import {UpdateServiceComponent} from "./pages/admin/services/update-service/update-service.component";
import {ListBarbersComponent} from "./pages/admin/barber/list-barbers/list-barbers.component";
import {NewServiceComponent} from "./pages/admin/services/new-service/new-service.component";
import {BarbershopMetricsComponent} from "./pages/barbershop-metrics/barbershop-metrics.component";
import {MydayComponent} from "./pages/barber/myday/myday.component";
import {MyDataComponent} from "./pages/client/my-data/my-data.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/barbero', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'newUser', component: NewUserComponent },
  { path: 'admin/newBarbero', component: NewBarberoComponent },
  { path: 'reserva', component: ReservasComponent},
  { path: 'service/new', component: NewServiceComponent},
  { path: 'service/update/:id', component: UpdateServiceComponent},
  { path: 'service/list', component: AllServicesComponent },
  { path: 'admin',component: AdminPageComponent},
  { path: "admin/category", component: CategoryComponent},
  { path: "admin/listBarber", component: ListBarbersComponent},
  { path: "metrics", component:BarbershopMetricsComponent},
  { path: 'barber/myDay', component: MydayComponent},
  { path: 'client/myData/:id',component: MyDataComponent}
];
